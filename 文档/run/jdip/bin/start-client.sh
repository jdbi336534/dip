#!/bin/sh

nowPath=$(cd `dirname $0`; pwd)
cd $nowPath
cd ../

basePath=`pwd`

className='com.r7data.jdip.client.DipClientStart'
parameter=$@

function javaRun(){
    echo "start"

    for i in lib/*; do
        CLASSPATH=$CLASSPATH:$basePath/$i
    done

    #base jar
    for i in target/*; do
        CLASSPATH=$CLASSPATH:$basePath/$i
    done

    cd ./target/
   
    java -Dfile.encoding=UTF-8 -Xmx512M $className ${parameter[*]} >> $basePath/runtimeLogs/jdipClientOut.log 2>&1 &
}


count=`ps -ef | grep $className | grep -v "grep" | wc -l`

if [ $count -gt 0 ];then
    currentThread=`ps -ef | grep $className | grep -v "grep"`
    echo "$className has been started, please stop it first : "
    echo " $currentThread"

else
    #run java
    javaRun
fi

