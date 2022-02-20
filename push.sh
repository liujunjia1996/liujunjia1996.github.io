 git add .
 line=$(git status | grep "nothing to commit" | wc -l )
 echo ${line}
if [ ${line} -lt 1 ];then
   git config --global user.name 'git-action'
   git config --global user.email 'git-action@users.noreply.github.com'
   git commit -m "auto commit"
   git push
fi 
 