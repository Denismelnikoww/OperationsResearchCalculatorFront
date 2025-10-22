import { Component, Output, EventEmitter, ViewChild } from '@angular/core'; // Добавлен ViewChild
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { LinearRowComponent, RowInput } from '../row-input/row-input'; // Убедитесь, что RowInput интерфейс экспортирован
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface MethodOption {
  label: string;
  value: string;
}

// Интерфейс для данных транспортной задачи
export interface TransportProblemData {
  suppliers: number[];
  buyers: number[];
  method: string;
}

@Component({
  selector: 'app-transport-conditions',
  imports: [
    Button,
    Card,
    LinearRowComponent, // Убедитесь, что LinearRowComponent правильно экспортирован
    Select,
    FormsModule
  ],
  templateUrl: './transport-conditions.html',
  styleUrl: './transport-conditions.css'
})
export class TransportConditions {
  @Output() onSolveForm = new EventEmitter<TransportProblemData>();

  public selectedFillMethod: string = "";
  public fillMethodOptions: MethodOption[] = [
    { label: "Метод северо-западного угла", value: "northwest" },
    { label: "Метод минимизации", value: "minimization" }
  ];

  // Добавляем ViewChild для доступа к дочерним компонентам
  @ViewChild('suppliersInput', { static: true }) suppliersInputComponent!: LinearRowComponent;
  @ViewChild('buyersInput', { static: true }) buyersInputComponent!: LinearRowComponent;

  // Опционально: задайте начальные значения
  initialSuppliersCount = 5;
  initialBuyersCount = 5;

  // Метод, вызываемый при нажатии кнопки "Решить"
  onSolve(): void {
    // Проверка, что компоненты существуют
    if (!this.suppliersInputComponent || !this.buyersInputComponent) {
      console.error('Дочерние компоненты не найдены');
      return;
    }

    // Получаем текущие значения строк из дочерних компонентов
    const suppliersRow = this.suppliersInputComponent.row(); // Используем сигнал
    const buyersRow = this.buyersInputComponent.row();       // Используем сигнал

    console.log('Текущая строка поставщиков:', suppliersRow); // Для отладки
    console.log('Текущая строка покупателей:', buyersRow);   // Для отладки

    // Проверка, что обе строки заполнены (по желанию)
    if (suppliersRow.length === 0) {
      console.warn('Строка поставщиков пуста');
      return; // Можно показать уведомление пользователю
    }
    if (buyersRow.length === 0) {
      console.warn('Строка покупателей пуста');
      return; // Можно показать уведомление пользователю
    }

    // Проверка, что метод выбран
    if (!this.selectedFillMethod) {
      console.warn('Метод не выбран');
      return; // Можно показать уведомление пользователю
    }

    // Собираем все данные в один объект
    const formData: TransportProblemData = {
      suppliers: suppliersRow,
      buyers: buyersRow,
      method: this.selectedFillMethod
    };

    // Отправляем данные родительскому компоненту или куда-то еще
    this.onSolveForm.emit(formData);

    console.log('Отправляемые данные:', formData); // Для отладки
  }
}