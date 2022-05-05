/*-------------------------LEXICO-------------------------*/
%lex

%options case-sensitive

%%

\n				  		return 'salto_linea'
\t						return 'tab'
\s+							{}

//Comentarios
"!!".*  					{}     //de linea
[‘][’][^’]*[’]+([^‘][^‘]*[‘]+)*[’][’]	{}


//‘’’
//‘’’

//Palabras reservadas
'Incerteza'				return 'incerteza'
'Importar'				return 'importar'	
'Double'				return 'double'
'Boolean'				return 'boolean'
'String'				return 'string'
'Int'					return 'int'
'Char'					return 'char'
'Void'					return 'void'
'true'					return 'true'
'false'					return 'false'
'Retorno'				return 'retorno'
'Si'					return 'si'
'Sino'					return 'sino'
'Para'					return 'para'
'Mientras'				return 'mientras'
'Detener'				return 'detener'
'Continuar'				return 'continuar'
'Mostrar'				return 'mostrar'
'DibujarAST'			return 'dib_ast'
'DibujarEXP'			return 'dib_exp'
'DibujarTS'				return 'dib_ts'
'crl'					return 'crl'

//Signos
'++'					return 'inc'
'+' 					return 'mas'
'--'					return 'dec'	
'-'						return 'menos'
'*'						return 'por'
'/'						return 'div'
'%'						return 'mod'
'^'						return 'pot'
'<='					return 'menor_igual'
'>='					return 'mayor_igual'
'<'						return 'menor'
'>'						return 'mayor'
'=='					return 'igual'
'='						return 'asig'
'!='					return 'dif'
'!'						return 'not'
'~'						return 'sig_inc'
'&&'					return 'and'
'||'					return 'or'
'|&'					return 'xor'
'('						return 'par_a'
')'						return 'par_c'
':'						return 'dos_p'
','						return 'coma'
';'						return 'pyc'
'.'						return 'punto'

//Valores
\"[^\"]*\"				{ yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
"'"[^]"'"  				return 'char_exp'
(()?[a-zA-Z]+(|[a-zA-Z0-9]+)*) return 'id'
[0-9]+("."[0-9]+)\b     return 'decimal'
[0-9]+\b                return 'entero'

<<EOF>>                 return 'EOF'

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%{
  const { NodoAST } = require('../arbol/NodoAST');
%}

/*-------------------------SINTACTICO-------------------------*/

// Asociación y precedencia
%left 'or'
%left 'and'
%left 'not'
%left 'xor'
%left 'igual' 'dif' 'sig_inc'
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'umenos'
%right 'pot'
%left 'inc' 'dec'

%start S


%% 

//Definición de la gramática
S
	: ENCABEZADO INSTRUCCIONES EOF 
	| INSTRUCCIONES EOF
;

ENCABEZADO
	: IMPORTACIONES INCERTEZA
	| IMPORTACIONES
	| INCERTEZA
;

IMPORTACIONES
	: IMPORTACIONES IMPORTAR
	| IMPORTAR
;

SALTOS
	: SALTOS salto_linea
	| salto_linea
;

TABS 
	: TABS tab
	| tab
;

IMPORTAR
	: importar id punto crl SALTOS
;

INCERTEZA 
	: incerteza decimal SALTOS
;

INSTRUCCIONES
	: INSTRUCCIONES TABS INSTRUCCION 
	| TABS INSTRUCCION
	| INSTRUCCIONES INSTRUCCION
	| INSTRUCCION 
;

INSTRUCCION
	: DECLARACIONES SALTOS
	| ASIGNACION
	| DECLARACION_FUNCION
	| LLAMADA_FUNCION SALTOS
	| RETORNO SALTOS
	| INSTRUCCION_SI SALTOS
	| INSTRUCCION_SINO SALTOS
	| MOSTRAR
	| PARA SALTOS
	| MIENTRAS SALTOS
	| DETENER SALTOS
	| CONTINUAR SALTOS
	| DIBUJAR_AST SALTOS
	| DIBUJAR_EXP SALTOS
	| DIBUJAR_TS SALTOS
;

DIBUJAR_AST
	: dib_ast par_a id par_c
;

DIBUJAR_EXP
	: dib_exp par_a EXP par_c
;

DIBUJAR_TS
	: dib_ts par_a par_c 
;

CONTINUAR
	: continuar 
;

DETENER
	: detener 
;

MIENTRAS
	: mientras par_a EXP par_c dos_p
;

PARA 
	: para par_a TIPO_VARIABLE_NATIVA id asig EXP pyc EXP pyc OP par_c dos_p  
	| for par_a ASIGNACION pyc EXP pyc ASIGNACION_FOR par_c dos_p
;

OP
	: inc 
	| dec 
;

MOSTRAR 
	: mostrar par_a LISTA_EXPRESIONES par_c SALTOS 
;

INSTRUCCION_SI
	: si par_a EXP par_c dos_p
;

INSTRUCCION_SINO
	: sino dos_p
;

RETORNO
	: retorno EXP  
	| retorno 
;

DECLARACIONES
	: TIPO_VARIABLE_NATIVA id
	| TIPO_VARIABLE_NATIVA id coma IDS asig EXP
	| TIPO_VARIABLE_NATIVA id asig EXP
	| TIPO_VARIABLE_NATIVA id par_a par_c dos_p
	| TIPO_VARIABLE_NATIVA id par_a LISTA_PARAMETROS par_c dos_p
;


LISTA_PARAMETROS
  	: LISTA_PARAMETROS coma PARAMETRO 
  	| PARAMETRO 
;

PARAMETRO
  	: TIPO_VARIABLE_NATIVA id  
;

ASIGNACION
	: id TIPO_IGUAL EXP SALTOS
; 

TIPO_IGUAL
	: asig 
;

IDS
	: IDS coma id
	| id
;

TIPO_VARIABLE_NATIVA
	: double  
	| boolean 
	| string 
	| int 
	| char 
	| void 
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec umenos  	{$$ = new NodoAST("EXP",""); $$.agregarHijo(new NodoAST("-","negativo")); $$.agregarHijo($2);}
  | EXP mas EXP  				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("+","suma")); $$.agregarHijo($3);}
  | EXP menos EXP 				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("-","resta")); $$.agregarHijo($3);}
  | EXP por EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("*","producto")); $$.agregarHijo($3);} 
  | EXP div EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("/","division")); $$.agregarHijo($3);} 
  | EXP mod EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("%","mod")); $$.agregarHijo($3);} 
  | EXP pot EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("^","potencia")); $$.agregarHijo($3);} 
  | par_a EXP par_c 			{$$ = new NodoAST("EXP", ""); $$.agregarHijo($2);}
  //Operaciones de Comparacion
  | EXP mayor EXP  				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST(">","mayor")); $$.agregarHijo($3);}
  | EXP menor EXP 				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("<","menor")); $$.agregarHijo($3);}
  | EXP mayor_igual EXP 		{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST(">=","mayor_igual")); $$.agregarHijo($3);}
  | EXP menor_igual EXP 		{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("<=","menor_igual")); $$.agregarHijo($3);}
  | EXP igual EXP 				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("==","igual")); $$.agregarHijo($3);}
  | EXP dif EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("!=","dif")); $$.agregarHijo($3);}
  | EXP sig_inc EXP 			{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("~","sig_inc")); $$.agregarHijo($3);}
  //Operaciones Lógicas
  | EXP and EXP 				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("&&","and")); $$.agregarHijo($3);}					
  | EXP or EXP					{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("||","or")); $$.agregarHijo($3);}
  | EXP xor EXP 				{$$ = new NodoAST("EXP",""); $$.agregarHijo($1); $$.agregarHijo(new NodoAST("|&","xor")); $$.agregarHijo($3);}	
  | not EXP 					{$$ = new NodoAST("EXP",""); $$.agregarHijo(new NodoAST("!","not")); $$.agregarHijo($2);}
  //Valores Primitivos
  | entero						{$$ = new NodoAST($1, "ENTERO");}
  | decimal						{$$ = new NodoAST($1, "DECIMAL");}
  | string						{$$ = new NodoAST($1, "STRING");}
  | id							{$$ = new NodoAST($1, "ID");}
  | true						{$$ = new NodoAST($1, "TRUE");}
  | false						{$$ = new NodoAST($1, "FALSE");}
  | cadena						{$$ = new NodoAST($1, "CADENA");}	
  | char_exp 					{$$ = new NodoAST($1, "CHAR");}
  //Funciones
  | LLAMADA_FUNCION 
;

LLAMADA_FUNCION
	: id par_a par_c 
	| id par_a LISTA_EXPRESIONES par_c 
;

LISTA_EXPRESIONES
	: LISTA_EXPRESIONES coma EXP 
	| EXP 
;