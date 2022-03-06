import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  shopForm:FormGroup;
  actionBtn:string='Save';
  constructor(@Inject(MAT_DIALOG_DATA) public editData:any,private formbuilder:FormBuilder,private shopservice:ShopService,private dialogref:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.shopForm=this.formbuilder.group({
      shopName:['',Validators.required],
      shopAddress:['',Validators.required],
      shopImage:['',Validators.required],
      shopNumber:['',Validators.required],
      shopTimings:['',Validators.required],
      shopCategory:['',Validators.required],
      shopDescription:['',Validators.required],
    })
    if(this.editData){
      this.actionBtn='Update';
      this.shopForm.controls['shopName'].setValue(this.editData.shopName);
      this.shopForm.controls['shopAddress'].setValue(this.editData.shopAddress);
      this.shopForm.controls['shopImage'].setValue(this.editData.shopImage);
      this.shopForm.controls['shopNumber'].setValue(this.editData.shopNumber);
      this.shopForm.controls['shopTimings'].setValue(this.editData.shopTimings);
      this.shopForm.controls['shopCategory'].setValue(this.editData.shopCategory);
      this.shopForm.controls['shopDescription'].setValue(this.editData.shopDescription);
    }
  }

  addShop(){
    if(!this.editData){
      this.shopservice.saveProduct(this.shopForm.value).subscribe((res)=>{
        alert('Post saved successfully');
        this.shopForm.reset();
        this.dialogref.close('save');
      }),
      error=>{
        alert('Your post did not saved successfully')
      }
    }
    else{
      this.updateShop();
    }
  }

  updateShop(){
    this.shopservice.putShop(this.shopForm.value,this.editData.id).subscribe((res)=>{
      alert('Data updated successfully!');
      this.shopForm.reset();
      this.dialogref.close('update');
    }),
    error=>{
      alert('Could not update data');
    }
  }

}
