#!/bin/sh

cd ..

ng build --prod

cp -r build/WEB-INF dist
zip -r tt-ng4-dist.zip dist
