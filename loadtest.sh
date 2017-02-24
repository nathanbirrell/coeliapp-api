#!/bin/bash

CURL='/usr/bin/curl'
RVMHTTP="http://localhost:3001/api/upload"
CURLARGS="-F filedata=@/Users/lab/Documents/Workspaces/github/test2.png"

for i in `seq 1 10`;
        do
        #echo /tmp/$i.out;
        START=$(date +%s)
        out="$($CURL $CURLARGS $RVMHTTP)"
        END=$(date +%s)
        DIFF=$(( $END - $START ))
        echo "It took $DIFF seconds"
        done