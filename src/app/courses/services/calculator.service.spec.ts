import { analyzeAndValidateNgModules } from "@angular/compiler";
import { TestBed } from "@angular/core/testing";
import { any } from "cypress/types/bluebird";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService' , () => {
    let calc:CalculatorService;
    let loggerSpy:any;

    beforeEach( ()=> {
        loggerSpy= jasmine.createSpyObj('LoggerService',["log"])
        TestBed.configureTestingModule(
            {
                providers: [
                    CalculatorService,
                    {provide:LoggerService , useValue:loggerSpy}
                ]
            }
        )
        calc=TestBed.inject(CalculatorService)
    })

    it('should add 2 numbers' , () => {
        const result=calc.add(2,3);
        expect(result).toBe(5,'Unexpected addtion failure');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
    it('should subtract 2 numbers' , () => {
        const result=calc.subtract(3,2);
        expect(result).toBe(1,'Unexpected subtract failure');
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    })
})