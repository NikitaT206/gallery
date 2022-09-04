import { createBrowserHistory } from 'history'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postImage, setPostCardSuccessFalse } from '../../services/slices/mainSlice'
import styles from './postImageForm.module.css'

export function PostImageForm() {
  const [hide, setHide] = useState(true)
  const [form, setForm] = useState({name: '', category: '', image: ''})
  const {postCardError, postCardCuccess, isSubmitButtonDisabled, postCardLoading} = useSelector(state => state.main)
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
  }

  useEffect(() => {
    dispatch(setPostCardSuccessFalse())
    if (postCardCuccess) {
      navigate('/')
    }
  }, [postCardCuccess])

  useEffect(() => {
    if (postCardError) {
      console.log(postCardError);
    }
  }, [postCardError])

  useEffect(() => {
    console.log(form.image);
  }, [form])

  return (
    <div className={hide ? styles.container : styles.containerShow}>
      {postCardLoading && (
        <div className={styles.loader}>
          <div className={styles.ldsdualring}></div>
        </div>
      )}
      {postCardError && <p>Error</p>}
      <form className={styles.form} encType={'multipart/form-data'} onSubmit={handleSubmit}>
        {form.image && <img className={styles.previewImage} src={URL.createObjectURL(form.image)}></img>}
        <input className={styles.input} required type={'text'} name={'name'} placeholder={'name'} value={form.name} onChange={handleChange} maxLength={15} minLength={1}></input>
        <input className={styles.input} required type={'text'} name={'category'} placeholder={'category'} value={form.category} onChange={handleChange} maxLength={15} minLength={1}></input>
        <div className={form.image ? styles.inputFileContainerSuccess : styles.inputFileContainer}>{form.image ? form.image.name : 'Choose image'}
          <input className={styles.inputFile} required type={'file'} name={'image'} placeholder={'insert file'} onChange={handleChangeFile}></input>
        </div>
        <button className={postCardLoading ? styles.submitButtonAnimated : styles.submitButton} type={'submit'} disabled={isSubmitButtonDisabled}>Post Image</button>
      </form>
    </div>
  )
}