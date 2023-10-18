import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionService } from '../conexion.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
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

  constructor(private router:Router, private fb:FormBuilder, private conexion:ConexionService) {
    var captchaResponseV2 = ""
  }

  ngOnInit(): void {
  }

  hide = true;
  captchaResponseV2 = ""
  frente = true;
  voltear(){
    this.frente = !this.frente;
    console.log(this.frente);

  }


  FormularioLogin: FormGroup = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  FormularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    // fecha_nacimiento: ['', Validators.required],
    // usuario: ['', Validators.required],
    // correo: ['', [Validators.required, Validators.email]],
    // telefono: ['', [Validators.required]],
    // password: ['', [Validators.required, Validators.minLength(6)]],
    // acceso: ['', Validators.required],
    // status: ['', Validators.required],
    idPais: [1], // Valor por defecto, puedes cambiarlo según tus necesidades
    idEstado: [1], // Valor por defecto, puedes cambiarlo según tus necesidades
    idMunicipio: [1], // Valor por defecto, puedes cambiarlo según tus necesidades
  });




  range = new FormGroup({
    // start: new FormControl<Date | null>(null),
    // end: new FormControl<Date | null>(null),
  });




  resolved(captchaResponse: string) {
   this.captchaResponseV2 =  captchaResponse;
  }


  crear(){
    if(this.captchaResponseV2 == ""){
      console.log("Aqui algo malo paso no firmaron el captcha")
    }
    if(this.FormularioLogin.invalid){
      console.log(this.FormularioLogin.value);

      console.log("El formulario falloo por ser el formulario xd");

      this.FormularioLogin.markAllAsTouched();
      return
    }

    console.log(this.FormularioLogin.value);
    console.log("Salio todo bien en el login!");
    this.router.navigate(['landing'])

  }



  Enviar(){
    if(this.FormularioLogin.invalid){
      console.log("es invalido");
      this.FormularioLogin.markAllAsTouched()
    }


    console.log("Es valido");


    this.conexion.Post('login', 'Login', this.FormularioLogin.value).subscribe((dato:any) => {
      console.log("Se consigio la entrada del form de la base de datos" + dato);

      console.log(dato);
      if(dato.status){
        // localStorage.setItem('token', dato._kmd.authtoken);
        localStorage.setItem('dataUser', JSON.stringify(dato));
        // localStorage.setItem('dataUser',dato);
        //   this.router.navigate(['producto']);
      }
    })
    this.router.navigate(['landing'])


  }



  signUp(){
    if(this.FormularioRegistro.invalid){
      console.log("No se lleno exitosamente todos los campos");
      return
    }


    console.log("El registro se llevo a cabo exitosamente");

  }




  isLoginActive = true;

  toggleForm() {
    this.isLoginActive = !this.isLoginActive;
  }




}
