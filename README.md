# game-api

Beta api at the moment only for highscore save.

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

path if set = required

### read

http://localhost:9000/{path}/read/{params}

limit (1-10) = required

path if set = required

http://localhost:9000/{path}/read?limit=10

offset={number} = optional

path if set = required

http://localhost:9000/{path}/read?limit=10&offset=2

### update

uuid = required

path if set = required

http://localhost:9000/{path}/update/{uuid}

### delete

uuid = required

path if set = required

http://localhost:9000/{path}/delete/{uuid}

## Routing

Route path is set for more flexibilty

    app.use('/api/beta/', router);
