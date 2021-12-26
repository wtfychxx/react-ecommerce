import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'

import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Card, CardHeader, CardContent, Divider, FormControl, Typography } from '@material-ui/core'
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import DatePicker from '@material-ui/lab/DatePicker'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { detail, list, insert, deleteData } from 'src/api/masterData';
import numeral, { reset } from 'numeral'
import moment from 'moment'

type Inputs = {
  id: number,
  userId: number,
  rating: number,
  content: string,
  productId: number
}

function Review() {

  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')
  const [productColor, setProductColor] = useState([])
  const theme = useTheme()
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>()

  const getData = async () => {
    const result = await list('review')

    if(result){
      setMessage(result.message)
      if(result.data.length){
        setTableData(result.data)
      }else{
        setTableData([])
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  const handleClickOpen = async (id: number = 0) => {
    reset()
    setValue("id", id)

    if(id > 0){
      const result = await detail('review', id)

      if(result.code === 200){
        setValue('userId', result.data.resultId)
        setValue('rating', result.data.rating)
        setValue('content', result.data.content)
        setValue('productId', result.data.productId)
      }
    }

    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = (id: number) => {
    return Swal.fire({
        icon: 'question',
        title: 'Are you sure to delete?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Do it!'
    }).then(async (result) => {
        if(result.value){
          const result = await deleteData('review', id)

          if(result.code === 200){
            Swal.fire({
              icon: 'success',
              title: result.message
            }).then(() => {
              getData()
            })
          }
        }
    });
}

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const endpoint = (data.id === 0) ? `review` : `review/${data.id}`
    const result = await insert(endpoint, data)

    if(result.code === 200){
        Swal.fire({
            icon: 'success',
            title: result.message
        }).then(() => {
            setOpen(false)
            getData()
        })
    }else{
        Swal.fire({
            icon: 'warning',
            title: result.message
        })
    }
  }

  const AddButton = () => {
    return(
      <Button variant="contained" onClick={() => handleClickOpen()}> Add </Button>
    )
  }

  return (
    <>
      <Helmet>
        <title>Review</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Review"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Review List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Review table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Title </TableCell>
                        <TableCell> Description </TableCell>
                        <TableCell> Valid Until </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        (tableData.length) ? tableData.map((entry, i) => (
                          <TableRow key={i}>
                            <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(entry.id)}>{entry.title}</Link></TableCell>
                            <TableCell>{entry.description}</TableCell>
                            <TableCell>{entry.validUntil}</TableCell>
                            <TableCell><Button variant="text" color="error" onClick={() => handleDelete(entry.id)}> Delete </Button></TableCell>
                          </TableRow>
                        )) : <TableRow>
                          <TableCell colSpan={5}>{message}</TableCell>
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ zIndex: 7 }}>
          <DialogTitle> Review Form </DialogTitle>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { mt: 2, width: 1, zIndex: '7 !important' } }}
            onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <input
                type="hidden"
                {...register("id")}
              />

              

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}

export default Review;