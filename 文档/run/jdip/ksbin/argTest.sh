#!/bin/ksh

nowPath=$(cd `dirname $0`; pwd)
cd $nowPath
cd ../

basePath=`pwd`

className='com.r7data.joalt.test.ParameterTest'
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
    
    print "end : $basePath"

    #parameter=$@
    print $@

    print ${parameter[*]}

    java -Dfile.encoding=UTF-8 -Xmx256M $className ${parameter[*]} 2>&1
}


count=`ps -ef | grep $className | grep -v "grep" | wc -l`

if [ $count -gt 0 ];then
    currentThread=`ps -ef | grep $className | grep -v "grep"`
    print "$className has been started, please stop it first : "
    print " $currentThread"

else
    #run java
    javaRun
fi


