# U farm Api
  set up

  1. git clone
  2. npm install
  3. Config the my sql server
     - change the password to your my sql server
  ## using the api 

   how to use it 
   
   use insomania to try out the different routes 

   1. get data from db http://localhost:3001/api/ufarm/farmerOne
   
   2. post data on db http://localhost:3001/api/ufarm/farmerOne
        `{
        "name": "Opini Isaac",
        "ward": "ward A",
            "gender": "male"

        } `

    3. put (update) http://localhost:3001/api/ufarm/farmerOne/1

    `
    {
        "name": "Andrew tate",
    }
    `
    4. delete    http://localhost:3001/api/ufarm/farmerOne/1
