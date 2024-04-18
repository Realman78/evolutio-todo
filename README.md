# Evolutio todo

## API documentation
API documentation is located on **localhost:8080/api-docs**

## Running the app
### Using docker
> docker pull realman78/evolutio-project:latest

> docker run -p 8080:8080 -e "INFOBIP_BASE_URL=infobip_base_url" -e "INFOBIP_API_KEY=infobip_api_key" -e "SENDER=sender_name" -e "RECEIVER=receiver_number" --name evolutio-project realman78/evolutio-project:latest

### Using code from github
> yarn install

> yarn start

## Frontend app usage tutorial:

- Adding a new todo -> insert the text into the input element and press Enter or click add.
- Mark task as done/not done -> Click "Mark Done"/"Mark Undone"
- Edit task text -> double click task text and submit after editing.


![Todo frontend](https://media.discordapp.net/attachments/913382978690875405/1230476359474741308/image.png?ex=66337569&is=66210069&hm=c743ceeb691f1578ea9a1ee7cee195720b127ef5be8b76b5da6d78702e92dacf&=&format=webp&quality=lossless&width=813&height=406)
