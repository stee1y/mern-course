import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"


export const AuthPage = () => {

  const auth = useContext(AuthContext)

  const message = useMessage()

  const [form, setForm] = useState({email: '', password: ''})

  const {loaading, error, request, clearError} = useHttp()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginrHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.id)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input 
                  className="yellow-input" 
                  placeholder="Введите email" 
                  id="email"
                  type="text" 
                  name="email"
                  value={form.email}
                  onChange={changeHandler}/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input 
                  className="yellow-input" 
                  placeholder="Введите пароль" 
                  id="password" 
                  type="password" 
                  name="password" 
                  value={form.password}
                  onChange={changeHandler}/>
                <label htmlFor="password">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4 m6 14" 
              href="#"
              disabled={loaading}
              onClick={loginrHandler}
              >Войти</button>
            <button 
              className="btn green darken-3" 
              href="#"
              disabled={loaading}
              onClick={registerHandler}
              >Регистрация</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
