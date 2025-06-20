import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {Client} from "../model/client.model";
import {User} from "../model/user.model";
import {environment} from "../../../environment.prod";

@Injectable({
    providedIn: 'root'
})


export class AuthenService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiUrl;
    getChallengeAgent(user: { email: string; fullName: string; [key: string]: any }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register/agent`,user,{
            observe: 'response'
        });
    }

    getChallengeAdmin(user: { email: string; fullName: string; [key: string]: any }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register/admin`,user);
    }

    // Change this api expression to be sp
    getChallengeClient(user: { email: string; fullName: string; [key: string]: any }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/register`,user,{
                observe: 'response'
            });
    }


    verifyAuthenticatorRequest(attestation: AttestationConveyancePreference, client: {
        email: string;
        fullName: string;
        [p: string]: any
    }){
        const params = new HttpParams().set('attestation', attestation);
        return this.http.post(`${this.apiUrl}/auth/register/verify`, client, { params });
    }

    saveCredentials(credential:any, challenge:any, userRole:String): Observable<any>{
        return this.http.post(`/webauthn/register/${userRole}`, credential, challenge);
    }


    verifyPassword(user:any):Observable<any> {
       return this.http.post(`${this.apiUrl}/auth/verification/password`, user);
    }

    loginUser(usercredential:any):Observable<any>{
        console.log(usercredential);
        return this.http.post(`${this.apiUrl}/auth/login`, usercredential);
    }

    adminLogin(credentials: {email: string, password: string}): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/admin/admin`, credentials);
    }

    firstLoginChangePassword(tempToken: string, newPassword: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/admin/first-login/change-password`,
            { newPassword },
            { params: { tempToken } }
        );
    }

    changeAdminPassword(Token: string, newPassword: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/admin/change-password`,
            { newPassword },
            { params: { Token } }
        );
    }

    getToken(): string | null {
        const token = localStorage.getItem('token');
        console.log('Current Token:', token);
        return token;
    }

    verifyPhoneNumber(phoneNumber:string) {
        const params = new HttpParams().set('phoneNumber', phoneNumber);
        return this.http.post(`${this.apiUrl}/auth/request-sms-verification`,
            null, { params }
        );
    }

    verifySMSCode(phone: string, codeVerification: string, user: { email: string; fullName: string; [key: string]: any }) {
        const params = new HttpParams()
            .set('phoneNumber', phone)
            .set('codeVerification', codeVerification);

        return this.http.post(`${this.apiUrl}/auth/verify-2fa`, user, { params });
    }

    verifyLogin2FA(phone: string, code: string) {
        const params = new HttpParams()
            .set('codeVerification', code)
            .set('phoneNumber', phone);

        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        return this.http.post<{
            user: any,
            role: string,
            jwtToken: string
        }>(`${this.apiUrl}/auth/login-verify-2fa`, null, {
            params,
            headers,
            observe: 'response'
        });
    }





}