import { createBrowserHistory } from 'history'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postImage } from '../../services/slices/mainSlice'
import styles from './postImageForm.module.css'

export function PostImageForm() {
  const [hide, setHide] = useState(true)
  const [form, setForm] = useState({name: '', category: '', image: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setHide(false)
  }, [])

  function handleChange(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  function handleChangeFile(event) {
    setForm({...form, image: event.target.files[0]})
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', form.category)
    formData.append('image', form.image)
    dispatch(postImage(formData))
    navigate('/')
  }

  return (
    <div className={hide ? styles.container : styles.containerShow}>
      <form className={styles.form} encType={'multipart/form-data'} onSubmit={handleSubmit}>
        <input className={styles.input} type={'text'} name={'name'} placeholder={'name'} value={form.name} onChange={handleChange}></input>
        <input className={styles.input} type={'text'} name={'category'} placeholder={'category'} value={form.category} onChange={handleChange}></input>
        <input className={styles.inputFile} type={'file'} name={'image'} placeholder={'insert file'} onChange={handleChangeFile}></input>
        <button className={styles.submitButton} type={'submit'}>Post Image</button>
      </form>
    </div>
  )
}