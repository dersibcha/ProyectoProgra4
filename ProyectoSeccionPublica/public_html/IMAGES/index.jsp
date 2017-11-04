<%-- 
    Document   : index
    Created on : 28/10/2017, 12:07:15 AM
    Author     : der12
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Pagina Principal</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <%@ include file="links.jspf" %>
        <%@ include file="menu.jspf" %>
    </head>
    <body>
      
        <div class="row">
           
            <div class="col-sm-12">


                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" >
                        <div class="item active">

                            <img class="images" src="IMAGES/1.jpg" alt="Chania" >
                            <div class="carousel-caption">
                                <h3>Los Angeles</h3>
                                <p>LA is always so much fun!</p>
                            </div>
                        </div>

                        <div class="item">
                            <img class="images" src="IMAGES/2.jpg" alt="Chicago">
                            <div class="carousel-caption">
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                            </div>
                        </div>

                        <div class="item">
                            <img  class="images" src="IMAGES/3.jpg" alt="New York">
                            <div class="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div>
                    </div>

                    <!-- Left and right controls -->
                    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#myCarousel" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
           <!-- Page Content -->
    <div class="container">

        <!-- Marketing Icons Section -->
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">
                    Bienvenido a DACAR
                </h1>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-check"></i> Historia</h4>
                    </div>
                    <div class="panel-body">
                        <p>En 2017 el servicio de alquiler de transporte vehicular costarricense DACAR, decide crear una compañía que se hiciera cargo 
                                de brindar el mejor servicio para poder competir en el mercado de este tipo de servicios.Esta Idea nace de un estudiante de la Universidad Nacional de Costa Rica.
                         </p>
                        <a href="historia.jsp" class="btn btn-default">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-gift"></i> ¿Sabías que DACAR fue la primera compañía de servicios de transporte  en trabajar de una forma innovadora?</h4>
                    </div>
                    <div class="panel-body">
                        <p>Este nuevo modelo de negocio ha revolucionado el mercado de transporte vehicular  en el país,<br>
                            democratizando el acceso al transporte alrededor del planeta.</p>
                        <a href="referente.html" class="btn btn-default">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><i class="fa fa-fw fa-compass"></i> Recomendaciones</h4>
                    </div>
                    <div class="panel-body">
                        <p>Estas son algunas recomendaciones que te serán de gran utilidad antes de que realices tu viaje con nosotros. </p>
                        <a href="referente.html" class="btn btn-default">Learn More</a>
                    </div>
                    
                </div>
            </div>
        </div>
        <!-- /.row -->

        <!-- Portfolio Section -->
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Galería</h2>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a1.jpg" alt="">
                </a>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a2.jpg" alt="">
                </a>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a4.jpg" alt="">
                </a>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a5.jpg" alt="">
                </a>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a3.jpg" alt="">
                </a>
            </div>
            <div class="col-md-4 col-sm-6">
                <a href="#">
                    <img class="img-responsive img-portfolio img-hover" src="IMAGES/a6.jpg" alt="">
                </a>
            </div>
        </div>
        <!-- /.row -->

        <!-- Features Section -->
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Globalización</h2>
            </div>
            <div class="col-md-6">
                <p>Como meta de la empresa:</p>
                <ul>
                    <li><strong>Abarcar el mercado en Oriente.</strong>
                    </li>
                    <li>Recorrer todos los Oceanos del planeta.</li>
                    <li>Abastecer de recursos a los habitantes de Africa</li>
                    <li>Unir lazos en aerolineas de  Latino America</li>
                    <li>Comunicar Polo Norte y Polo Sur.</li>
                    
                </ul>
                <p>La importancia de unir el planeta por medio de medios de transporte abarca en la libertad e igualdad en que cada individuo sea beneficiado de este servicio.</p></div>
            <div class="col-md-6">
                <img class="img-responsive" src="IMAGES/a7.jpg" alt="">
            </div>
        </div>
        <!-- /.row -->

        <hr>

        <!-- Call to Action Section -->
        <div class="well">
            <div class="row">
                <div class="col-md-8">
                    <p>Por alguna duda o sugerencia .</p>
                </div>
                <div class="col-md-4">
                    <a class="btn btn-lg btn-default btn-block" href="contactenos.html">Contactenos</a>
                </div>
              
            </div>
        </div>

        <hr>

        <!-- Footer -->
        <footer>
           <br><br>
     
        <nav class="navbar navbar-light bg-light ">
            
                <ul class="nav navbar-nav navbar-right">
                    <li><a >Ayuda</a></li>
                    <li><a >Derechos reservados</a></li>
                </ul>
            
        </nav>
         
        </footer>

    </div>
    <!-- /.container -->

    
    
        
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <!-- Script to Activate the Carousel -->
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>
    </body>
</html>

