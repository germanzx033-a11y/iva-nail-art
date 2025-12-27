import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Image Generation API
 * Uses Replicate for nail art generation and style fusion
 */

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

// Models for different AI tasks
const MODELS = {
  // SDXL for high-quality nail art generation
  sdxl: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
  // ControlNet for guided generation (preserving hand structure)
  controlnet: 'jagilley/controlnet-canny:aff48af9c68d162388d230a2ab003f68d2638f8810d3ce67bd8c29a6ae25ad76',
  // Image-to-image for style transfer
  img2img: 'stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d',
};

interface GenerateRequest {
  prompt: string;
  image?: string; // Base64 image for img2img
  model?: keyof typeof MODELS;
  style?: 'elegant' | 'bold' | 'minimalist' | 'artistic';
}

// Style modifiers for nail art prompts
const STYLE_MODIFIERS = {
  elegant: 'elegant luxury nail art, sophisticated design, rose gold accents, minimalist chic, professional manicure, high-end salon quality',
  bold: 'bold vibrant nail art, striking colors, dramatic design, eye-catching patterns, statement nails, artistic expression',
  minimalist: 'minimalist nail art, clean lines, subtle elegance, nude tones, simple geometric shapes, understated beauty',
  artistic: 'artistic nail art, creative design, unique patterns, hand-painted details, avant-garde style, gallery-worthy nails',
};

export async function POST(request: NextRequest) {
  try {
    // Check if API token is configured
    if (!REPLICATE_API_TOKEN) {
      // Return demo mode response
      return NextResponse.json({
        success: true,
        mode: 'demo',
        message: 'AI generation is in demo mode. Configure REPLICATE_API_TOKEN for full functionality.',
        mockResult: {
          id: `demo-${Date.now()}`,
          status: 'succeeded',
          output: ['/portada.jpg'], // Use existing image as placeholder
        },
      });
    }

    const body: GenerateRequest = await request.json();
    const { prompt, image, model = 'sdxl', style = 'elegant' } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Enhance prompt with nail art context and style
    const enhancedPrompt = `${prompt}, ${STYLE_MODIFIERS[style]}, beautiful manicured hands, professional nail photography, studio lighting, 8k ultra detailed`;

    // Prepare request based on model type
    let input: Record<string, unknown> = {};

    if (model === 'sdxl') {
      input = {
        prompt: enhancedPrompt,
        negative_prompt: 'ugly, deformed, noisy, blurry, low quality, distorted fingers, extra fingers, missing fingers, bad anatomy',
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: 'K_EULER',
        num_inference_steps: 30,
        guidance_scale: 7.5,
        refine: 'expert_ensemble_refiner',
        refine_steps: 10,
      };
    } else if (model === 'img2img' && image) {
      input = {
        prompt: enhancedPrompt,
        image: image,
        prompt_strength: 0.6, // Preserve hand structure
        num_outputs: 1,
        num_inference_steps: 25,
        guidance_scale: 7.5,
      };
    } else if (model === 'controlnet' && image) {
      input = {
        prompt: enhancedPrompt,
        image: image,
        num_samples: '1',
        image_resolution: '768',
        low_threshold: 100,
        high_threshold: 200,
        ddim_steps: 30,
        scale: 9,
      };
    }

    // Make request to Replicate
    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: MODELS[model],
        input,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[AI] Replicate error:', error);
      return NextResponse.json(
        { error: 'AI generation failed', details: error },
        { status: response.status }
      );
    }

    const prediction = await response.json();

    return NextResponse.json({
      success: true,
      prediction: {
        id: prediction.id,
        status: prediction.status,
        urls: prediction.urls,
      },
    });

  } catch (error) {
    console.error('[AI] Generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get prediction status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Prediction ID is required' },
      { status: 400 }
    );
  }

  // Demo mode
  if (id.startsWith('demo-') || !REPLICATE_API_TOKEN) {
    return NextResponse.json({
      id,
      status: 'succeeded',
      output: ['/portada.jpg'],
      mode: 'demo',
    });
  }

  try {
    const response = await fetch(`${REPLICATE_API_URL}/${id}`, {
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch prediction' },
        { status: response.status }
      );
    }

    const prediction = await response.json();

    return NextResponse.json({
      id: prediction.id,
      status: prediction.status,
      output: prediction.output,
      error: prediction.error,
    });

  } catch (error) {
    console.error('[AI] Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
