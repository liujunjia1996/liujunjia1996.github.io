 git add .
 line=$(git status | grep "nothing to commit" | wc -l )
 echo ${line}
if [ ${line} -lt 1 ];then 
   git commit -m "auto commit"
   git push
fi 
 