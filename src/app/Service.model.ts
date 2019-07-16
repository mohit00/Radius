export class WebserModel  
{
    public Sevice: any;

    constructor()
    {
        this.Sevice =  
            { 
                BASE_URL: 'http://13.126.31.198:8080/',
                BASENEWURL: 'http://13.126.31.198:8090/',

                CREATE_ATTRIBUTE_TEMPLATE:'/attributeTemplates'
            }
        }
    }
