import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing"
import { delay } from "cypress/types/bluebird"
import { of } from "rxjs"

describe("Async Test example" , ()=>{
it ("Asynchronous test example with done()" , (done:DoneFn) => {
    let test = false
    setTimeout( ()=> {
        test=true
        expect(test).toBeTruthy()
        done()
    },1000)
})
it ("Asynchronous test example setTimeOut" , fakeAsync( () => {
    let test = false
    let a=0
    setTimeout( ()=> {
        a=a+1
    },1000)
    setTimeout( ()=> {
        test=true
        a=a+1
    },1000)
    flush()
    expect (a).toBe(2)
    console.log(a)
    }))
it ("Promise based test" , fakeAsync(() => {

    let test=false
    console.log("1 : Creating a promise")
    /*
    setTimeout( () => {
        console.log("2b : Timeout")
        },1000)
        */
    Promise.resolve().then( ()=> {
        console.log("1st promise")
        test=true
        return Promise.resolve();
    }).then( () => {
        console.log("2nd promise")
    })

    flushMicrotasks();
    console.log("3: Promise is done");
    expect(test).toBeTruthy();
    
    }))
it ("Asynchronous promise+SetTimeout tests", fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then( ()=> {
        counter+=10;
        setTimeout( ()=> {
            counter+=1;
        },1000)
    })
    expect (counter).toBe(0);
    flushMicrotasks()
    expect (counter).toBe(10);
    flush()
    expect (counter).toBe(11);
    }))
it ("Observables testings", () => {
        let a= 0;
        console.log("1 : " , a)
        const test$=of(a)
        console.log("4 : ",a)
        test$.subscribe( ()=> {
            console.log("2 : ",a)
            a+=1;
            console.log("3 : ",a)
        })
        console.log("5 : ",a,test$)
        expect(a).toBe(1);
    })

it ("Observation with delay" , fakeAsync(()=> {
    let test=false;
    console.log("Creating observable")
    const test$=of(test);
    test$.subscribe( ()=> {
        setTimeout( ()=> {
            test=true
        },1000)
    })
    flush()
    expect(test).toBeTruthy()

}))





})





