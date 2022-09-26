/* eslint-disable no-restricted-globals */
import { addHours, differenceInSeconds } from 'date-fns'
import { useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

export function CalendarModal () {
  const { isDateModalOpen, closeDateModal, toggleDateModal } = useUiStore()

  const [formValues, setFormValues] = useState({
    title: '',
    notes: 'adfdsgjggksgg',
    start: new Date(),
    end: addHours(new Date(), 2)
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return (formValues.title.length > 0)
      ? 'is-valid'
      : 'is-invalid'
  }, [formValues.title, formSubmitted])

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal()
    // setisOpen(false)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    const diffence = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(diffence) || diffence <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) return

    console.log(formValues)

    // Cerrar modal
    // Remover errores en pantalla
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>

        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
            locale='es'
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>Una descripción corta</small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>Información adicional</small>
        </div>

        <button
          type='submit'
          className='btn btn-outline-primary btn-block btnmodal'
        >
          <i className='far fa-save' />
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}