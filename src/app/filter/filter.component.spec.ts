// filter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let toggleButton: DebugElement;
  let submitButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    toggleButton = fixture.debugElement.query(By.css('ion-button')); // First ion-button is the toggle
    submitButton = fixture.debugElement.query(By.css('ion-card-content ion-button')); // Submit button
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with collapsed state', () => {
    expect(component.isCollapsed).toBeTrue();
    const content = fixture.debugElement.query(By.css('ion-card-content'));

    // Check initial styles for collapsed state
    const styles = getComputedStyle(content.nativeElement);
    expect(styles.height).toBe('0px');
    expect(styles.opacity).toBe('0');
  });

  it('should toggle collapsed state when the toggle button is clicked', () => {
    // Click to expand
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCollapsed).toBeFalse();

    // Check if content is visible
    const content = fixture.debugElement.query(By.css('ion-card-content'));
    const styles = getComputedStyle(content.nativeElement);
    expect(content).not.toBeNull();

    // Click to collapse
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCollapsed).toBeTrue();

    // Check collapsed styles again
    expect(styles.height).toBe('0px');
    expect(styles.opacity).toBe('0');
  });

  it('should rotate the icon based on the collapse state', () => {
    const icon = toggleButton.query(By.css('ion-icon'));
    expect(icon.classes['rotated']).toBeUndefined(); // Initially no 'rotated' class when collapsed

    // Toggle to expand
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(icon.classes['rotated']).toBeTrue(); // Should have 'rotated' class when expanded

    // Toggle to collapse
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(icon.classes['rotated']).toBeUndefined(); // 'rotated' class removed when collapsed
  });

  it('should emit submitAction event when submit button is clicked', () => {
    spyOn(component.search, 'emit');

    // First, expand the form content
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Click the submit button
    submitButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalled();
  });
});
