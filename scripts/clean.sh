#!/bin/bash

serverFolder="workspaces/server"
clientFolder="workspaces/client"

distFolder="dist"

moduleFiles=(
  "node_modules/"
  "$serverFolder/node_modules/"
  "$clientFolder/node_modules/"
)

builtFiles=(
  "$distFolder/"
)

turboCached=(
  "$serverFolder/.turbo"
  "$clientFolder/.turbo"
)

clientFiles=(
  "$clientFolder/node_modules/"
  "$distFolder/public"
  "$clientFolder/.turbo"
)

serverFiles=(
  "$serverFolder/node_modules/"
  "$distFolder/"
  "$serverFolder/.turbo"
)

files=()

case $1 in
  "--all" | "-a")
    files=(${moduleFiles[@]} ${builtFiles[@]} ${turboCached[@]})
    ;;
    
  "--built" | "-b")
    files=(${builtFiles[@]})
    ;;

  "--turbo" | "-t")
    files=(${turboCached[@]})
    ;;
    
  "--dependencies" | "-d")
    files=(${moduleFiles[@]})
    ;;

  "--client" | "-c")
    files=(${clientFiles[@]})
    ;;

  "--server" | "-s")
    files=(${serverFiles[@]})
    ;;

  *)
    echo -n "Unknown"
    ;;
esac

removeIfExists() {
  for file in "${files[@]}"
  do
    if [ -e "$file" ] ; then
      echo "Removing \"$file\"..."
      sleep .5
      rm -rf "$file" &
    fi
  done
}

removeIfExists

wait

echo "Done!"

timeOut=3

read -r -p "Wait $timeOut seconds or press any key to continue immediately" -t $timeOut -n 1 -s
