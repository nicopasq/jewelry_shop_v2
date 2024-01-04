#!/usr/bin/env bash
# exit on error
set -o errexit

# builds the front end code
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# builds the back end code
bundle install
bundle exec rake db:reset
bundle exec rake db:migrate
Product.create(product_name:'Black Opal', image_path:'/black_opal', product_type:'ring', price:250 ,in_stock: true)
bundle exec rake db:seed # if you have seed data, run this command for the initial deploy only
