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

export default function editModal({
  isOpen,
  setModalOpen2,
  valueModal,
  editItems
}) {
  const [value, setValue] = useState('')
  const modalRef = useRef()

  const editItem = () => {
    // pegar os dados do local storage (array)
    const storedItems = JSON.parse(localStorage.getItem('item'))
    // achar o indice(index) do item no array
    let indice = -1
    for (let i = 0; i < storedItems.length; i++) {
      if (storedItems[i].inputValue === valueModal) {
        indice = i
      }
    }
    // muda o array na posição do item com o novo valor
    storedItems[indice].inputValue = value

    // armazena array editado no local storage
    localStorage.setItem('item', JSON.stringify(storedItems))
    // Atualizar items no App.jsx
    editItems(storedItems)
    // Fechar o modal
    setModalOpen2()
  }

  useEffect(() => {
    if (valueModal) {
      // setar o valor
      setValue(valueModal)
    }
  }, [valueModal])

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen2(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setModalOpen2])

  if (!isOpen) {
    return null
  }
  return (
    <div style={BACKGROUUND_STYLE}>
      <div style={MODAL_STYLE} ref={modalRef}>
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
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button type="button" onClick={editItem}>
              Editar
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <button style={{ width: 100 }} onClick={setModalOpen2}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
