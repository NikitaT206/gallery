import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postImage, setCurrentTab, setPostCardSuccessFalse } from '../../services/slices/mainSlice'
import styles from './postImageForm.module.css'

export function PostImageForm() {
  const [hide, setHide] = useState(true)
  const [form, setForm] = useState({name: '', category: '', image: ''})
  const {postCardError, postCardCuccess, isSubmitButtonDisabled, postCardLoading, initialCards} = useSelector(state => state.main)
  const [showCategories, setShowCategories] = useState(false)
  const [height, setHeight] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tabs = useMemo(() => {
    const category = initialCards.map(item => item.category[0].toUpperCase() + item.category.slice(1, item.length))
    return [...new Set([...category])]
  }, [initialCards])

  const [tabsFilter, setTabsFilter] = useState(tabs)

  function handleChange(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  function handleChangeCategory(event) {
    setForm({...form, [event.target.name]: event.target.value})
    const filter = tabs.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()))
    setTabsFilter(filter)
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

  function onCategoryClickHandler(item) {
    setForm({...form, category: item})
    setShowCategories(false)
  }

  function showCategoriesHandler(event) {
    event.stopPropagation()
    setShowCategories(!showCategories)
  }

  const numberHeight = useMemo(() => tabsFilter.length * 40.7, [tabsFilter]) 

  useEffect(() => {
    if (numberHeight < 250) {
      setHeight(numberHeight)
    } else {
      setHeight(255)
    }
  }, [numberHeight])

  useEffect(() => {
    dispatch(setPostCardSuccessFalse())
    if (postCardCuccess) {
      dispatch(setCurrentTab(form.category))
      navigate('/')
    }
  }, [postCardCuccess, dispatch])

  useEffect(() => {
    setHide(false)
  }, [])

  return (
    <div className={hide ? styles.container : styles.containerShow} onClick={() => setShowCategories(false)}>
      {postCardLoading && (
        <div className={styles.loader}>
          <div className={styles.ldsdualring}></div>
        </div>
      )}
      {postCardError && <p>Error</p>}

      <form 
        className={styles.form} 
        encType={'multipart/form-data'} 
        onSubmit={handleSubmit}
      >
        {form.image && <img className={styles.previewImage} src={URL.createObjectURL(form.image)} alt={'preview'}></img>}

        <input 
          className={styles.input} 
          required 
          type={'text'} 
          name={'name'} 
          placeholder={'name'} 
          value={form.name} 
          onChange={handleChange} 
          maxLength={15} 
          minLength={1}
        ></input>

        <div 
          className={styles.inputContainerCategory} 
          onClick={(event) => showCategoriesHandler(event)}
        >
          <input 
            className={styles.input} 
            required 
            type={'text'} 
            name={'category'} 
            placeholder={'category'} 
            value={form.category} 
            onChange={handleChangeCategory} 
            maxLength={15} 
            minLength={1}
          ></input>

          <div 
            style={ showCategories && tabsFilter.length ? {height: `${height}px`, padding: `0px`} : {height: `0px`}} 
            className={showCategories ? styles.categoriesContainer : styles.categoriesContainerHide}
          >
            {tabsFilter.map((item, index) => {
              return <p key={index} className={styles.category} onClick={() => onCategoryClickHandler(item)}>{item}</p>
            })}
          </div>

        </div>

        <div 
          className={form.image ? styles.inputFileContainerSuccess : styles.inputFileContainer}>
            {form.image ? form.image.name : 'Choose image'}
          <input 
            className={styles.inputFile} 
            required 
            type={'file'} 
            name={'image'} 
            placeholder={'insert file'} 
            onChange={handleChangeFile}
          ></input>
        </div>

        <button 
          className={postCardLoading ? styles.submitButtonAnimated : styles.submitButton} 
          type={'submit'} 
          disabled={(!form.category || !form.name || !form.image) || isSubmitButtonDisabled}>
            {(!form.category || !form.name || !form.image) ? 'Fill the Form' : 'Post Image'}
        </button>

      </form>
    </div>
  )
}