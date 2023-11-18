import React, { useState, useEffect, useRef } from 'react'

const BACKGROUUND_STYLE = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'rgb(0,0,0, 0.7)',
  zIndex: '1000',
  color: 'black'
}

const MODAL_STYLE = {
  position: 'fixed',
  width: '20%',
  display: 'flex',
  flexDirection: 'row',
  height: '20%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',

  backgroundColor: '#fff',
  borderRadius: '10px'
}

export default function Modal({ isOpen, setModalOpen, addItems }) {
  const [inputValue, setInputValue] = useState('')
  const modalRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setModalOpen])

  if (!isOpen) {
    return null
  }

  console.log(modalRef)
  const addItem = () => {
    // Verifique se o valor não está vazio ou apenas espaços em branco
    if (inputValue.trim() !== '') {
      // pegar o estado global (local storage)
      const storagedItems = JSON.parse(localStorage.getItem('item') || [])

      // adicionou o novo item
      storagedItems.push({
        inputValue,
        doneValue: false
      })

      // armazena estado global
      localStorage.setItem('item', JSON.stringify(storagedItems))

      // Atualizar items no App.jsx
      addItems(storagedItems)
      setInputValue('') // Limpe o valor do input
      setModalOpen(false)
    }
  }

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  return (
    <div style={BACKGROUUND_STYLE} >
      <div style={MODAL_STYLE} 
                  ref={modalRef}
                  >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'column'
          }}
        >

          <div

            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Digite algo para lembrar"
            />
            <button type="button" onClick={addItem}>
              Adicionar
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <button style={{ width: 100 }} onClick={setModalOpen}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
