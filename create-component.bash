echo Наименование компонента: 
read a
a=$(echo $a | sed 's/[^0-9a-zA-Z\-_]//g')
/c/Program\ Files\ \(x86\)/GnuWin32/bin/tree.exe -d ./src/components
echo В какую папку положить компонент: 
read b
mkdir ./src/components/$b/$a
touch ./src/components/$b/$a/_$a.sass
touch ./src/components/$b/$a/$a.pug
echo .$a >> ./src/components/$b/$a/_$a.sass