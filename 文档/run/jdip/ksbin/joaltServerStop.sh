#!/bin/ksh

nowPath=$(cd `dirname $0`; pwd)
cd $nowPath
cd ../

basePath=`pwd`

className='com.r7data.joalt.server.JoaltServerStop'
parameter=$@

function javaRun
{
    print "start"

    for i in lib/*; do
        CLASSPATH=$CLASSPATH:$basePath/$i
    done

    #base jar
    for i in target/*; do
        CLASSPATH=$CLASSPATH:$basePath/$i
    done

    cd ./target/
   
    java -Dfile.encoding=UTF-8 -Xmx256M $className ${parameter[*]} 
}


#run java
javaRun

