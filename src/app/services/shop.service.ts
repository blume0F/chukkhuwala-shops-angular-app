import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shop } from '../model/shop';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  uid:any;

  constructor(public afAuth:AngularFireAuth,private http:HttpClient,private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.uid = user.uid;
      } 
    }) 
   }

  saveProduct(data:any){
    return this.http.post<any>('https://chukkhuwala-default-rtdb.asia-southeast1.firebasedatabase.app/shopList.json',data);
  }

  getProduct(){
    return this.http.get<{[id:string]:Shop}>('https://chukkhuwala-default-rtdb.asia-southeast1.firebasedatabase.app/shopList.json'
    ).pipe(map(posts=>{
      let shopsData:Shop[]=[];
      for(let id in posts){
        shopsData.push({...posts[id],id});
      }
      return shopsData;
    }))
  }

  putShop(data:any,id:number){
    return this.http.put<any>('https://chukkhuwala-default-rtdb.asia-southeast1.firebasedatabase.app/shopList/'+id+'.json',data);
  }

  deleteShop(id:number){
    return this.http.delete<any>('https://chukkhuwala-default-rtdb.asia-southeast1.firebasedatabase.app/shopList/'+id+'.json');
  }

  getUserShops(){
    return this.http.get<{[id:string]:Shop}>('https://chukkhuwala-default-rtdb.asia-southeast1.firebasedatabase.app/shopList.json'
    ).pipe(map(posts=>{
      let shopsData:Shop[]=[];
      for(let id in posts){
        shopsData.push({...posts[id],id});
      }
      let result:Shop[]=[];
      result=shopsData.filter(data=>data.uid===this.uid);
      return result
    }))
  }
}
