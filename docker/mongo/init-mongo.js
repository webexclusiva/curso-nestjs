db.createUser(
    {
        user: 'docker',
        pwd: 'docker',
        roles: [
            {
                role: 'readWrite',
                db: 'cursonest'
            }
        ]
    }
)