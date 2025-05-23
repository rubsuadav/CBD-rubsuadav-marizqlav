# CBD-rubsuadav-marizqlav

Desarrollado por:

- Rubén Suárez David
- Mario Izquierdo Lavado

## Manual de instalación

En este manual de instalación se detallan los pasos para ejecutar la aplicación tanto en Windows como en Linux:
Si está usando Windows vaya a la sección de [WINDOWS](#WINDOWS), del contrario vaya a la de [LINUX](#LINUX). Previamente para ambos, se debe de realizar los pasos 0 y 1 descritos debajo.

0. - Descargar el zip del código del repositorio.
1. - Descomprimir el zip del código descargado en el lugar que prefiera (para facilidad se recomienda descomprimirlo en el Escritorio).

# WINDOWS

2. - Renombrar el fichero .env.example a .env (fichero ubicado en la carpeta backend).

- Si **NO** tiene instalado MongoDB deberá seguir los pasos de la sección [INSTALAR MONGODB](#instalar-mongodb), si se tiene MongoDB instalado y en funcionamiento puede pasar al siguiente paso.
- Si **NO** tiene Node instalado deberá de seguir los pasos de la sección [INSTALAR NODE](#instalar-node), si se tiene instalado Node puede irse directamente a la sección [EJECUTAR APP](#ejecutar-app)

## INSTALAR MONGODB

Para instalar MongoDB deberá seguir los pasos descritos en la carpeta 02- No SQL - MongoDB del laboratorio --> 02- Instalación de MongoDB.

## INSTALAR NODE

3. - Instalar Node 22, para ello haga click en el siguiente enlace: https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi y siga las instrucciones del instalador.
4. - Comprobar versiones de Node y npm ejecutando los siguientes comandos:

```
node -v
npm -v
```

La salida debe de devolver v22.X.X para Node y 10.9.2 para npm.

## EJECUTAR APP

5. - Abra la carpeta descomprimida si no la ha abierto aún y **ejecute** el script llamado **runWindows.bat** haciendo doble click en el fichero.

   Ese script instalará las dependencias del backend, levantará el servidor de express en el puerto 3000 de manera automática en segundo plano e instalará las dependencias del frontend levantando en primer plano de manera automática la aplicación en el puerto 5173, abriendo la aplicación automáticamente en el navegador.

# LINUX

2. - Abrir la carpeta descargada y crear fichero .env, para ello haga botón derecho en la carpeta descomprimida, abrir terminal y ejecuta estos comandos:

```
cd backend
cp .env.example .env
```

- Si **NO** tiene instalado MongoDB deberá seguir los pasos de la sección [INSTALAR MONGODB LINUX](#instalar-mongodb-linux), si se tiene MongoDB instalado y en funcionamiento puede pasar al siguiente paso.
- Si **NO** tiene Node instalado deberá de seguir los pasos de la sección [INSTALAR NODE LINUX](#instalar-node-linux), si se tiene instalado Node puede irse directamente a la sección [EJECUTAR APP LINUX](#ejecutar-app-linux)

## INSTALAR MONGODB LINUX

Deberá ingresar al siguiente enlace: https://www.mongodb.com/try/download/community, seleccione la plataforma correspondiente en función de la versión de Ubuntu que tenga instalada en su equipo. Esto le descargará un fichero .deb con el servidor de Mongodb.
Deberá hacer lo mismo con MongoDB Compass, puedede descargar el fichero .deb desde este enlace https://www.mongodb.com/try/download/compass.

Tras las descargas deberá de dirigirse al directorio Descargas o Downloads, abrir una terminar en ese directorio y ejecutar estos comandos:

```
sudo dpkg -i mongodb-org-server_8.0.5_amd64.deb
sudo systemctl status mongod.service
q
sudo systemctl start mongod.service
sudo dpkg -i mongodb-compass_1.45.4_amd64.deb
mongodb-compass
```

NOTA: SI LE AVISA DE QUE DEBE DE INTRODUCIR LA CONTRASEÑA PARA SUDO, DEBE DE INGRESAR LA QUE ELIGIÓ CUANDO SE INSTALÓ EL S.O.

Estos comandos instalan la versión LTS 8 del servicio de MongoDB, comprueba si se está ejecutando el servicio y si no lo está lo arranca, finalmente instala el GUI de MongoDB Compass para la iteracción con MongoDB.

## INSTALAR NODE LINUX

Para instar Node debe de ejecutar el script **installNodeLinux.sh**, para ello ejecute estos comandos:

```
cd ..
chmod +x installNodeLinux.sh
./installNodeLinux.sh
```

La salida debe de devolver v22.X.X para Node y 10.9.2 para npm.

## EJECUTAR APP LINUX

Para ejecutar la aplicación debe de ejecutar el script **runLinux.sh**, para ello ejecute estos comandos:

```
chmod +x runLinux.sh
./runLinux.sh
```

Ese script instalará las dependencias del backend, levantará el servidor de express en el puerto 3000 de manera automática en segundo plano e instalará las dependencias del frontend levantando en primer plano de manera automática la aplicación en el puerto 5173, abriendo la aplicación automáticamente en el navegador.
