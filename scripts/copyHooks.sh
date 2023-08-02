#!/bin/bash
# uvcorchestra.com/scripts/copyHooks.sh
# Created by Alexander Burdiss 8/2/23
# Copyright (c) Alexander Burdiss
#
# A simple script that copies hooks from the scripts/hooks directory to the
# appropriate place in the untracked git configuration
#
cp -R scripts/hooks/ .git/hooks/

chmod -R +x .git/hooks/

echo 'git hooks copied'
