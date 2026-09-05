import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-center-section',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatIconModule,NgFor],
  templateUrl: './center-section.component.html',
  styleUrl: './center-section.component.css'
})
export class CenterSectionComponent {

    title = "Books";

  cards = [
  {
    id: 1,
    title: 'Admission Register',
    description: 'Register containing complete admission details of students enrolled in the institution.',
    image: 'https://cdn.penguin.co.in/wp-content/uploads/2025/08/9780143475828.jpg',
    category: 'Student Records',
    recordType: 'Permanent Register',
    fields: [
      'Admission Number',
      'Student Name',
      'Date of Birth',
      'Gender',
      'Parent Name',
      'Address',
      'Date of Admission',
      'Class',
      'Previous School',
      'Contact Number'
    ],
    amount: 500,
  },
  {
    id: 2,
    title: 'Attendance Register',
    description: 'Daily record of student attendance maintained class-wise and month-wise.',
    image: "https://material.angular.dev/assets/img/examples/shiba2.jpg",
    category: 'Attendance',
    recordType: 'Daily Register',
    fields: [
      'Roll Number',
      'Student Name',
      'Class',
      'Section',
      'Month',
      'Working Days',
      'Days Present',
      'Days Absent',
      'Leave',
      'Attendance Percentage'
    ],
    amount: 500,
  },
  {
    id: 3,
    title: 'Fee Collection Register',
    description: 'Record of tuition fees and other payments collected from students.',
    image: 'https://via.placeholder.com/150',
    category: 'Accounts',
    recordType: 'Financial Register',
    fields: [
      'Receipt Number',
      'Student Name',
      'Admission Number',
      'Class',
      'Fee Type',
      'Amount',
      'Payment Date',
      'Payment Mode',
      'Transaction Number',
      'Balance Amount'
    ],
    amount: 500,
  },
  {
    id: 4,
    title: 'Stock Register',
    description: 'Register used to record the purchase, issue, and balance of institutional supplies and materials.',
    image: 'https://via.placeholder.com/150',
    category: 'Inventory',
    recordType: 'Stock Register',
    fields: [
      'Item Number',
      'Item Name',
      'Description',
      'Date of Purchase',
      'Quantity Received',
      'Quantity Issued',
      'Balance Quantity',
      'Unit Price',
      'Total Value',
      'Supplier Name'
    ],
    amount: 500,
  },
];

}
