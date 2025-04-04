#!/bin/bash

set -a
source .env
set +a

echo 'Generating supabase types...'
npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/types/supabase.types.ts
