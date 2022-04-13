# game-api

tbd

#start

    yarn run dev

## Api Calls and Params

### create

http://localhost:9000/create

    {
    "title":"title five",
    "completed": false
    }

title = required

completed = optional

### read

http://localhost:9000/read/{params}

limit (1-10) = required

http://localhost:9000/read?limit=10

offset={number} = optional

http://localhost:9000/read?limit=10&offset=2

### update

uuid = required

http://localhost:9000/update/{uuid}

### delete

uuid = required

http://localhost:9000/delete/{uuid}
