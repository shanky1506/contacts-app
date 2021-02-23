import logo from './logo.svg';
import axios from 'axios';
import './App.css'
import {useState,useEffect} from 'react'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';



import './App.css';
const BackEndDomain = `http://localhost:5000`;



function App() {

  return (
    <div className="App">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/contacts/:id">
            <Contacts />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Contacts()
{
  const fakeContacts = [
    {
      id:1,
      name:"shashank gunda",
      email: "shashankgunda68@gmail.com",
      phone: "+91-8142008448",
      // photo:
    },
    { 
      id:2,
      name:"shashank gunda",
      email: "shashankgunda68@gmail.com",
      phone: "+91-8142008448",
      // photo:
    },
    {
      id:3,
      name:"shashank gunda",
      email: "shashankgunda68@gmail.com",
      phone: "+91-8142008448",
      // photo:
    },
  ]
  const [contacts, setContacts] = useState(fakeContacts)
  
  
  let {id} = useParams()
  const fetchTasks = async(id)=>{
    axios.get(`http://localhost:5000/contacts/${id}`)
    .then(res =>{
      const  persons = res.data;
      setContacts(persons);
      console.log({"res.data":res.data})
      console.log("IT WORKS")
    })
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(id)
      
    }

    getTasks()
  }, [])  
  
  return (
    <div className="contacts">
      <header>
        <h2>CONTACTS</h2>
        <h3>ID: {id}</h3>
      </header>
      <div>
        {
          contacts.map((contact) => <Contact contact={contact}/>)
        }
      </div>
    </div>
  )  
}

// function Login(){
//   return(
//     <div className="login container">
//       <a href={`${BackEndDomain}/auth/google`} className="btn red darken-1">
//         <i className="fab fa-google left"></i> Log in with google
//       </a> 
//     </div>
//   )
// }

function Contact({contact}){
  return(
    <div className="contact">
      {contact.name} 
      {contact.email} 
      {contact.phone} 
      <br/>
    </div>
  )

}

export default App;
