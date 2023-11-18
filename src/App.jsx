import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import './App.css'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import Modal from './components/modal'
import EditModal from './components/modal2'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [filter, setFilter] = useState('')
  const storedItems = JSON.parse(localStorage.getItem('item')) || []
  const [items, setItems] = useState(storedItems)
  const [modal2Data, setModal2Data] = useState('')





  const handleModalEditData = item => {
    setModal2Data(item)
    setOpenModal2(true)
  }

  const handleSelectValue = item => {
    // pegar os dados do local storage (array)
    const storedItems = JSON.parse(localStorage.getItem('item'))
    // percorre o array com os items guardados pra achar o indice
    let indice = -1
    for (let i = 0; i < storedItems.length; i++) {
      if (storedItems[i].inputValue === item.inputValue) {
        indice = i
      }
    }
    // com o indice, altera o a propriedade de done do objeto na posição do indice
    storedItems[indice].doneValue = !storedItems[indice].doneValue
    // armazena o array modificado
    localStorage.setItem('item', JSON.stringify(storedItems))
    setItems(storedItems)
  }

  const removeItem = index => {
    const updateItems = [...items]
    updateItems.splice(index, 1)
    setItems(updateItems)
    // Atualizar items no estado global
    localStorage.setItem('item', JSON.stringify(updateItems))
  }

  const handleFilterChange = (e) =>{
    // verifica se o e.target.value é do tipo string
    if(typeof e.target.value === 'string'){
      // se for a gente atualiza o state local(items) com o estado global(localStorage)
      setItems(storedItems)
      return
    }
      
    // usar .filter no state gloval (localStorage) pra receber um novo array
    const filterItems = storedItems.filter((todo) => todo.doneValue === e.target.value)
    // seta o state local (items) com o novo array
    setItems(filterItems)
    setFilter(e.target.value)
  }

  return (
    <>
      <div className="content">
        <header className="header">
          TODO APP
          <div style={{ backgroundColor: 'black', width: 65, height: 60 }}>
            <img
              style={{ width: 55, height: 55, marginTop: 2 }}
              src="src\assets\react.svg"
              alt=""
            />
          </div>
        </header>

        <div className="tasks">
          <Button
            onClick={() => setOpenModal(true)}
            style={{
              backgroundColor: '#646EF1',
              color: 'white',
              borderRadius: 5,
              width: 100,
              maxHeight: 40,
              marginTop: 20,
              fontWeight: 600
            }}
          >
            Add task
          </Button>
          <Modal
            
            isOpen={openModal}
            setModalOpen={() => setOpenModal(!openModal)}
            addItems={setItems}

          ></Modal>
          <EditModal
            isOpen={openModal2}
            valueModal={modal2Data}
            editItems={setItems}
            setModalOpen2={() => setOpenModal2(!openModal2)}
          ></EditModal>

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label"></InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filter}
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                All
              </MenuItem>
              <MenuItem  value={true}>Done</MenuItem>
              <MenuItem value={false}>Undone</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="container" style={{ display: 'flex' }}>
          <div className="toDo" style={{ flex: 1, minHeight: 400 }}>
            {items.map((item, index) => (
              <div className={item.doneValue ? "strike" : ""} key={index}>
              <div className="Do" >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#666DEF',
                        '&.Mui-checked': { color: '#666DEF' }
                      }}
                      value={item.doneValue}
                      onChange={() => handleSelectValue(item)}
                      checked={item.doneValue}
                    />
                  }
                  label={item.inputValue}
                />
                <div>
                  <Button
                    onClick={() => removeItem(index)}
                    style={{
                      backgroundColor: '#eaeaea',
                      marginRight: 15,
                      marginTop: 5
                    }}
                  >
                    <DeleteIcon style={{ color: '#585858' }} />
                  </Button>

                  <Button
                    onClick={() => handleModalEditData(item.inputValue)}
                    style={{
                      backgroundColor: '#eaeaea',
                      marginRight: 15,
                      marginTop: 5
                    }}
                  >
                    <EditIcon style={{ color: '#585858' }} />
                  </Button>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
