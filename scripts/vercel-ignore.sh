#!/bin/sh
# Vercel "Ignored Build Step": exit 0 = skip this build, exit 1 = build.
#
# Several Vercel projects are connected to this repository, and every push used
# to make a deployment in each of them (which hit Vercel's daily deployment
# limit). Only the production project, "iva-nail-art" (prj_Q5PitwaECDIr3F9JdW7bpH8uhxwm),
# needs to build, so the other projects are skipped.
#
# This fails open: if VERCEL_PROJECT_ID is unset or is not one of the ids below,
# the build runs, exactly as it did before this script existed.
case "$VERCEL_PROJECT_ID" in
  prj_dUeIDcjwvGe8khlZrpGSdKvVL0f6|\
  prj_G652qPZD1NiG7BH560yjw6gmwopr|\
  prj_jMU1iOXufG2TAnGJzgWspyl5KePp|\
  prj_Y8j38Vmrm2l0QM2j7gEfVR0pANTb|\
  prj_853C1UqNg02YAPh1U9ElNXn7nZ74|\
  prj_B6SOeo0iN2fZosu7r1MmINCUfODG|\
  prj_6FAZYYeme4emzJlHEprKgDEIkaXn)
    echo "Skipping build: auxiliary Vercel project $VERCEL_PROJECT_ID"
    exit 0
    ;;
  *)
    exit 1
    ;;
esac
