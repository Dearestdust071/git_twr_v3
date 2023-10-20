import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionService } from '../conexion.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0%)' })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
  ],

})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private conexion: ConexionService) {
    var captchaResponseV2 = ""
  }

  ngOnInit(): void {
  }

  hide_password = true;
  captchaResponseV2 = ""
  frente = false;

  voltearTarjeta() {
    this.frente = !this.frente;
    console.log(this.frente);
  }


  FormularioLogin: FormGroup = this.fb.group({
    email: ['dearestdust071@gmail.com', [Validators.required, Validators.email]],
    password: ['qwerty12345', [Validators.required, Validators.minLength(6)]],
  });


  FormularioRegistro: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    fecha_nacimiento: ['2023-10-18', Validators.required], /* var fechaSQL = '2023-10-18'; */
    usuario: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    /*  acceso: ['', Validators.required], */ /* Que liz me diga cuales son los enums  ? si es que los meto yo desde aqui*/
    /* status: ['', Validators.required], */ /* Que liz me diga cuales son los enums   ? si es que los meto yo desde aqui*/
    id_pais: [1],
    id_estado: [1],
    id_municipio: [1],
  });








  resolved(captchaResponse: string) {
    this.captchaResponseV2 = captchaResponse;
  }

  Enviar_login() {
    if (this.captchaResponseV2 == "") {
      console.log("Aqui algo malo paso no firmaron el captcha")
    }
    if (this.FormularioLogin.invalid) {
      console.log(this.FormularioLogin.value);

      console.log("El formulario falloo por ser el formulario xd");

      this.FormularioLogin.markAllAsTouched();
      return
    }


    console.log("Es valido");
    console.log(this.FormularioLogin.value.email,);
    emailjs.init("CTOgcb2g19CWdWfzG");


    emailjs.send("service_m5n33rg","template_7ihaxen",{
      to_name: this.FormularioLogin.value.email,
      });


      alert("Se ingreso con exito!")


    this.conexion.Post('login', 'Login', this.FormularioLogin.value).subscribe((dato:any) => {
      console.log("Se consigio la entrada del form de la base de datos" + dato);

      console.log(dato);
      if(dato.status){
        // localStorage.setItem('token', dato._kmd.authtoken);
        localStorage.setItem('dataUser', JSON.stringify(dato));
      }
    })
    /*
    public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, 'YOUR_PUBLIC_KEY')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  } */


  }



  Enviar_signUp() {
    if (this.FormularioRegistro.invalid) {
      console.log("No se lleno exitosamente todos los campos");
      console.log(this.FormularioRegistro.value);
      return
    }
    console.log("El registro se llevo a cabo exitosamente");
    console.log(this.FormularioRegistro.value);

    //alert('Se ha registrado exitosamente (cheque su correo)')
    this.router.navigate(["landing"]);

    emailjs.init("CTOgcb2g19CWdWfzG");
    emailjs.send("service_m5n33rg","template_7ihaxen",{
      to_name: this.FormularioRegistro.value.usuario,
      para: this.FormularioRegistro.value.correo,
      });



      this.conexion.Post('registro', 'Registro', this.FormularioRegistro.value).subscribe((dato:any) => {
        console.log("Se consigio la entrada del form de la base de datos" + dato);
        console.log(dato);

      })
  }

}
