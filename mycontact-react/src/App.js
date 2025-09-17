import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

function App() {
  // Connexion
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // Inscription (séparés)
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPwd, setSignupPwd] = useState("");

  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);


  function loadContacts(tkn) {
  const auth = tkn || token;               // utilise le token passé, sinon celui du state
  if (!auth) return;                       // pas de token => on ne tente pas
  fetch(API_URL + "/api/contact", {
    headers: { Authorization: "Bearer " + auth }
  })
    .then(res => res.json())
    .then(data => Array.isArray(data) ? setContacts(data) : setContacts([]))
    .catch(() => setMsg("Erreur lors du chargement des contacts"));
}

  function signup() {
    setMsg("");
    fetch(API_URL + "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signupEmail, password: signupPwd })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then((result) => {
        if (!result.ok) throw new Error(result.data.error || result.data.message || "Erreur signup");
        return fetch(API_URL + "/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: signupEmail, password: signupPwd })
        });
      })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then((result) => {
        if (!result.ok) throw new Error(result.data.error || result.data.message || "Erreur login auto");
        setToken(result.data.token);
        setMsg("Compte créé et connecté.");
        setSignupEmail(""); setSignupPwd("");
        loadContacts(result.data.token);
      })
      .catch((err) => setMsg(err.message));
  }

  function login() {
    setMsg("");
    fetch(API_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pwd })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then((result) => {
        if (!result.ok) throw new Error(result.data.error || result.data.message || "Erreur login");
        setToken(result.data.token);
        setMsg("Connecté.");
        setEmail(""); setPwd("");
        loadContacts(result.date.token);
      })
      .catch((err) => setMsg(err.message));
  }

  function logout() {
    setToken("");
    setMsg("Déconnecté.");
    setContacts([]);
  }

  function addContact() {
    setMsg("");
    fetch(API_URL + "/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phone
      })
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then((result) => {
        if (!result.ok) throw new Error(result.data.error || "Erreur création contact");
        setMsg("Contact ajouté.");
        setFirstName(""); setLastName(""); setPhone("");
        loadContacts();
      })
      .catch((err) => setMsg(err.message));
  }

  return (
    <div>
      <h1>MyContacts</h1>

      {!token && (
        <div>
          <h2>Inscription</h2>
          <input placeholder="Email" value={signupEmail} onChange={(e)=>setSignupEmail(e.target.value)} />
          <input placeholder="Mot de passe" type="password" value={signupPwd} onChange={(e)=>setSignupPwd(e.target.value)} />
          <button onClick={signup}>Créer un compte</button>

          <h2>Connexion</h2>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input placeholder="Mot de passe" type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
          <button onClick={login}>Se connecter</button>
        </div>
      )}

      {token && (
        <div>
          {msg && <p>{msg}</p>}
          <button onClick={logout}>Se déconnecter</button>

          <h2>Ajouter un contact</h2>
          <input placeholder="Prénom" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
          <input placeholder="Nom" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
          <input placeholder="Téléphone (10 chiffres)" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <button onClick={addContact}>Ajouter</button>

          <h2>Mes contacts</h2>
          <ul>
            {contacts.map(c => (
              <li key={c._id}>
                {c.first_name} {c.last_name} — {c.phone_number}
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </div>
  );
}

export default App;
