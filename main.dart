import "package:flutter/material.dart";
import "dart:math";

void main() => runApp(MaterialApp(
  initialRoute: '/',
  title: 'EMI Calc',
  // home: FirstScreen(),
  theme: ThemeData( 
    accentColor: Colors.redAccent,
      primaryColor: Colors.redAccent
  ),
  routes: {
    '/': (context) => FirstScreen(),
    '/second': (context) => SecondScreen()
  },
));

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.redAccent,
      // appBar: AppBar(
      //   title: Text("First Screen"),
      // ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              child: Text("Welcome to EMI calculator", 
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 24.0,
                  fontStyle: FontStyle.italic,
                  color: Colors.white
                ),
              )
            ),

            Container(
              margin: EdgeInsets.symmetric(vertical: 20.0),

              child: InkWell(
                onTap: (){
                  Navigator.pushReplacementNamed(context, '/second');
                },
                child: Column(
                  
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircleAvatar(
                          backgroundColor: Colors.white,
                          
                          radius: 30.0,
                          child: Icon(
                            
                            Icons.looks_one,
                            size: 30.0,
                            color: Colors.redAccent,
                          )
                        ),
                        CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 50.0,
                          child: Icon(
                            Icons.looks_two,
                            size: 80.0,
                            color: Colors.redAccent,
                          )
                        ),
                      ],
                    ),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 50.0,
                          child: Icon(
                            Icons.looks_3,
                            size: 80.0,
                            color: Colors.redAccent,
                          )
                        ),
                        CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 30.0,
                          child: Icon(
                            Icons.looks_4,
                            size: 30.0,
                            color: Colors.redAccent,
                          )
                        ),
                      ],
                    ),
                  ]
                )

              
              ,)             
            ),

            Container(
              child: Text("Tap to Proceed", 
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18.0,
                  fontStyle: FontStyle.italic,
                  color: Colors.white
                ),
              )
            )

          ],
        )    
      )
    );
  }
}
class SecondScreen extends StatefulWidget {
  @override
  _SecondScreenState createState() => _SecondScreenState();
}

class _SecondScreenState extends State<SecondScreen> {
  bool _switchValue = true;
  final TextEditingController _principalAmount = TextEditingController();
  final TextEditingController _interestRate = TextEditingController();
  final TextEditingController _tenure = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        elevation: 0.0,
        title: Text("Second Screen"),
        automaticallyImplyLeading: false
      ),
      body: Center(

        child: Container(
          child: Column(
            children: [

              Container(
                padding: EdgeInsets.all(20.0),
                child: TextField(
                  controller: _principalAmount,
                  decoration: InputDecoration(
                    labelText: "Enter Principal Amount"
                  ),
                  keyboardType: TextInputType.number,
                )
              ),
              Container(
                padding: EdgeInsets.all(20.0),
                child: TextField(
                  controller: _interestRate,
                  decoration: InputDecoration(
                    labelText: 'Interest Rate'
                  ),
                  keyboardType: TextInputType.number,
                )
              ),

              Container(
                padding: EdgeInsets.all(20.0),
                child: Row(
                  children: <Widget>[
                    Flexible(
                      flex: 4,
                      fit: FlexFit.tight, 
                      child: TextField(
                        decoration: InputDecoration(
                          labelText: 'Tenure'
                        ),
                        controller: _tenure,
                      )
                    ),

                    tenureSwitchWidget(),
                  ],
                )
              ),

              //  Calculate Button
              Flexible(
                fit: FlexFit.loose,
                
                child: FlatButton(
                  onPressed: _handleCalculation,
                  child: Text("Calculate" ),
                  color: Colors.redAccent,
                  textColor: Colors.white,
                  padding: EdgeInsets.only(top: 10.0, bottom: 10.0, left: 24.0, right: 24.0),
                )
              ),
              emiResultWidget(_emiResult),
            ]
          )
        )
      ),
    );
  }

  List _tenureTypes = [ 'Month(s)', 'Year(s)'];
  String _tenureType = "Year(s)";
  String _emiResult = "";

  //  TenureSwitch
  Widget tenureSwitchWidget() {
    return 
     Flexible(
      flex: 1,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            _tenureType,
            style: TextStyle(
              fontWeight: FontWeight.bold
            )
          ),
          Switch(
            value: _switchValue,
            onChanged: (bool value) { 
              print(value);
              if(value) {
                _tenureType = _tenureTypes[1];
              } else {
                _tenureType = _tenureTypes[0];
              }
              setState(() {
                  _switchValue = value;
                }
              );
            }
          )
        ],
      )
    );
  }

  void _handleCalculation() {
    print("_handleCalculation");

    //  A = payment Amount per period
    //  P = initial Principal (loan amount)
    //  r = interest rate per period
    //  n = total number of payments or periods
    //  A = P * r(1 + r) power of n / (1 + r) (pow of n) - 1 

    double A = 0.0;
    int P = int.parse(_principalAmount.text);
    double r = int.parse(_interestRate.text) / 12 / 100;
    int n = _tenureType == "Year(s)" ? int.parse(_tenure.text) * 12 : int.parse(_tenure.text);

    //emi = (p * r * Math.pow((1 + r),n)/( Math.pow((1 + r),n) - 1));
    A = (P * r * pow((1 + r), n) / (pow((1 + r), n) - 1));
 
    print("$_tenureType");
    print("P = $P, R = $r, n=$n");
    print(A.toStringAsFixed(2));
    _emiResult = A.toStringAsFixed(2);

    setState(() {
          
    });
  }
}

Widget emiResultWidget(emiResult) {
  bool canShow = true;

  String _emiResult = emiResult;
  
  if(_emiResult.length > 0 ) {
    canShow = true;
  }
  
  return Container(
    margin: EdgeInsets.only(top: 40.0),
    child: canShow ? Column(
      children: <Widget>[
        Text("Your Monthly EMI is", 
          style: TextStyle(
            fontSize: 18.0, 
            fontWeight: FontWeight.bold
          ), 
        ),
        Container(
          child:
          Text( _emiResult, 
            style: TextStyle(
              fontSize: 50.0, 
              fontWeight: FontWeight.bold
            ), 
          ),
        )          
      ],
    ) : Container(),
  );
}