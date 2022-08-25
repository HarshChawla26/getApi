import express from "express";
const app = express();
import fetch from 'node-fetch';

const port = 3000;
// get API to get todos API without userId

app.get('/todos',(req,res)=>{
    async function fetchAPi(){
        const answer = await fetch('https://jsonplaceholder.typicode.com/todos').then(
            resp=>resp.json()
        ).then(
            data=>{
                data.map((ele)=>{
                    delete ele.userId;
                    return ele;
                })
                return data;
            }
        ).catch((e)=>{
            console.log(`something went wrong ${e}`)
        })
        res.send(answer)
    }
    fetchAPi();
})

// get API to get user/<id> info with additional feature of todos array of that users 

app.get('/user/:id',(req,res)=>{
    async function fetchusers(){
        const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${req.params.id}`,{id:req.params.id}).then(
            resp=>resp.json()
        ).then(
            userdata=>{
                async function k(){
                    const answer = await  fetch('https://jsonplaceholder.typicode.com/todos').then(
                        resp=>resp.json()
                    ).then(
                        todos_data=>{
                            userdata.todos = todos_data.filter((ele)=>{
                                return ele.userId==req.params.id;
                            })
                            return userdata;
                        }
                    ).catch((e)=>{
                        res.send(`something went wrong ${e}`);
                    })
                    // res.send(answer)
                    return answer;
                }
                return k();
            }
        )
        res.send(resp);
    }
    fetchusers();
})


app.get('/',(req,res)=>{
    res.send("This is your main server page")
})

app.get('*',(req,res)=>{
    res.status(404).send('404 Page not found')
})


app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})