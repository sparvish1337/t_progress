fx_version "cerulean"
games {
  "gta5",
  "rdr3"
}

description "Mantine Progressbar"
author "Sparvish"
version '1.0.0'

lua54 'yes'

ui_page 'web/build/index.html'

shared_script "shared/**/*"
client_script "client/**/*"
server_script "server/**/*"

files {
  'web/build/index.html',
  'web/build/**/*',
}

exports {
  'ShowProgressBar'
}