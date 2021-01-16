import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, Toolbar } from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems,secondaryListItems } from '../../ui/ListItems';
import { useStyles, nombreAplicacion } from '../../../styles/theme';
import {FootBar } from '../../ui/FootBar'
import {ToolBarScreen } from '../../ui/ToolBarScreen'


import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Appointments,
    MonthView,
    DateNavigator,
    Toolbar as Toolbar2,
    AppointmentTooltip,
    AppointmentForm,
    ConfirmationDialog,
    TodayButton,
    Resources,
    EditRecurrenceMenu,
    DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
  
import { useDispatch, useSelector } from 'react-redux';
import { deleteCalendar, loadCalendar, saveCalendar, updateCalendar } from '../../../actions/calendar';
//import appointments from './today-appoinments'
import {
  pink, purple, teal, amber, deepOrange, lime, brown,
} from '@material-ui/core/colors';

      
const currentDate = new Date();
      
const mensajes = {
  detailsLabel: 'Detalles',
  allDayLabel: 'Todo el dia',
  titleLabel: 'Titulo',
  commitCommand: 'Guardar',
  moreInformationLabel: 'Mas informacion',
  repeatLabel: 'Repetir',
  notesLabel: 'Notas',
  never: 'Nunca',
  daily: 'Diariamente',
  weekly: 'Semanalmente',
  monthly: 'Mensualmente',
  yearly: 'Anualmente',
  repeatEveryLabel: 'Repetir cada',
  daysLabel: 'Dia(s)',
  endRepeatLabel: 'Finalizar repetir',
  onLabel: 'En',
  afterLabel: 'Despues',
  occurrencesLabel: 'Ocaciones',
  weeksOnLabel: 'Semana(s) en:',
  monthsLabel: 'mes(es)',
  ofEveryMonthLabel: 'cada mes de',
  theLabel: 'El',
  firstLabel: 'Primero',
  secondLabel: 'Segundo',
  thirdLabel: 'Tercero',
  fourthLabel: 'Cuarto',
  lastLabel: 'Ultimo',
  yearsLabel: 'Año(s)',
  ofLabel: 'de',
  everyLabel: 'Cada'

}

const trabajadores = [
  {
    text: 'Enrique',
    id: 1,
    color: deepOrange,
  }, {
    text: 'Daniel',
    id: 2,
    color: pink,
  }, {
    text: 'Ninguno',
    id: 3,
    color: amber,
  }]

const lotes = [
  {
    text: 'Lote 1 - Nancy',
    id: 1,
    color: amber,
    persona: 'Nancy'
  },{
    text: 'Lote 2 - Dora Luz',
    id: 2,
    color: pink,
    persona: 'Dora Luz'
  },{
    text: 'Lote 3 - Fabiola',
    id: 3,
    color: purple,
    persona: 'Fabiola'
  },{
    text: 'Lote 4 - Gloria',
    id: 4,
    color: teal,
    persona: 'Gloria'
  }, {
    text: 'Lote 5 - Hector Ruiz',
    id: 5,
    color: deepOrange,
    persona: 'Hector Ruiz'
  },{
    text: 'Lote 6 - Hector A. Ruiz',
    id: 6,
    color: brown,
    persona: 'Hector A. Ruiz'
  },{
    text: 'Comun',
    id: 7,
    color: lime,
    persona: 'Comun'
  }
]

const resources= [
  {
    fieldName: 'roomId',
    title: 'Lote',
    instances: lotes,
  },{
    fieldName: 'members',
    title: 'Trabajador',
    instances: trabajadores
  },
]

const appointments2 = [
{
    id: 0,
    title: 'Watercolor Landscape',
    roomId: 1,
    members: 1,
    startDate: new Date(2020, 4, 1, 9, 30),
    endDate: new Date(2020, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
}
]


export const CalendarioScreen = () => {

    const dispatch = useDispatch()
    const {calendar : appointments} = useSelector(state => state.calendar)
    const [calendario, setCalendario] = useState(appointments2)

    //Theme
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //Theme end 

    //get calendario de db
    useEffect(() => {
      dispatch(loadCalendar());
    }, [dispatch]) 

    const commitChanges = ({ added, changed, deleted }) => {
      if(added){
        //console.log(added)
        dispatch(saveCalendar(added))
      }
      if(changed){
        
        //console.log(changed)
        const idCambio = parseInt(Object.keys(changed)[0]);

        //actualizamos el objeto
        const nNuevo = {
          ...calendario[idCambio-1],...changed[idCambio]
        }
        //console.log(nNuevo)  solo el objeto que cambio.

        //actualizamos el arreglo
        const nAct = calendario.map(res =>{
          if(res.title === lotes[res.roomId-1].persona){
            nNuevo.title = '';
          }

          if(res.id === idCambio){
            return nNuevo;
          }else{
            return res;
          }
        })
        
        dispatch(updateCalendar(nNuevo))
        setCalendario(nAct)
      }
      if(deleted){
        //console.log(deleted)
        dispatch(deleteCalendar(deleted))
        
      }
    }

    //damos date, boolean u opciones si viene vacio un campo.
    useEffect(() => {
      const conDate = appointments.map((set) =>{
        set.startDate = new Date(set.startDate)
        set.endDate = new Date(set.endDate)
        set.allDay = Boolean(set.allDay)
        if(!set.notes){
          set.notes = '';
        }
        if(!set.title){
          set.title = lotes[set.roomId-1].persona;
        }
        return set;
      })
        setCalendario(conDate);
        //console.log(conDate)

    }, [appointments])


    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        
        <ToolBarScreen classes={classes}/>
      </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>{ nombreAplicacion }
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
       
       
            <Scheduler
              data={calendario}
              locale={'es-US'}
            >
            <ViewState
              defaultCurrentDate={currentDate}
            />
            <EditingState
              onCommitChanges={commitChanges}
            />
            <EditRecurrenceMenu />

            <IntegratedEditing />

            <MonthView
            />
            <Appointments 
            
            />
            <AppointmentTooltip
              showCloseButton
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm
              messages = {mensajes}
            />

            <Resources
              data={resources}
              mainResourceName="roomId"
            />
            <DragDropProvider />

            <Toolbar2 />
            <DateNavigator />
            <TodayButton 
              messages={{today:'Hoy'}}
            />
            <ConfirmationDialog />
            </Scheduler>


        <FootBar classes={classes}/>  
      </main>
    </div>
    )
}
