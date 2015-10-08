<?php
/*  require_once("./include/membersite_config.php");

  // Check if the user has authorization to view this page
  if (!$fgmembersite->checkLogin()) {
      $fgmembersite->redirectToURL("login.html");
      exit;
  }*/
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xlmns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
  <title>Software Engineering for Sustainability</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="src/css/style.css" />
  <link rel="stylesheet"
    href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
  />
</head>
<body>
  <div id="canvas" onclick="PALETTE_CONTROL.currentSelection.canvasClick()">
  </div>
  <div id="palette">
    <button class="palette_heading" type="button" class="btn btn-info"
    data-toggle="collapse" data-target="#palette_top">
      <img class="palette_icon" src="img/palette_view.gif"
           alt="palette" />
      Palette
    </button>
    <div id="palette_top" class="collapse">
      <div id="select" class="option"
           onclick="PALETTE_CONTROL.highlightSelect()">
        <img src="img/arrow16.gif" "Mouse Pointer" />
        Select
      </div>
      <div id="comment" class="option" onclick="PALETTE_CONTROL.highlight()">
        <img src="img/Comment16.gif" alt="Comment" />
        Comment
      </div>
    </div>
    <button class="palette_heading" type="button"
            class="btn btn-info" data-toggle="collapse" data-target="#links">
      <img class="palette_icon" src="img/folder16.gif"
           alt="Folder" />
      Links
    </button>
    <div id="links" class="collapse">
      <div id="decomposition" class="option"
        onclick="PALETTE_CONTROL.highlightDecomposition()">
        <img src="img/Decomposition16.gif" alt="Decomposition" />
        Decomposition
      </div>
      <div id="contribution" class="option"
           onclick="PALETTE_CONTROL.highlightContribution()">
        <img src="img/Contribution16.gif" alt="Contribution" />
        Contribution
      </div>
      <div id="dependency" class="option"
        onclick="PALETTE_CONTROL.highlightDependency()">
        <img src="img/Dependency16.gif" alt="Dependency"/>
        Dependency
      </div>
      <div id="belief_link" class="option"
        onclick="PALETTE_CONTROL.highlightBeliefLink()">
        <img src="img/BeliefLink16.gif" alt="Belief" />
        Belief Link
      </div>
    </div>
    <button class="palette_heading" type="button"
            class="btn btn-info" data-toggle="collapse"
            data-target="#components">
      <img class="palette_icon" src="img/folder16.gif"
           alt="Folder" />
      Components
    </button>
    <div id="components" class="collapse">
      <div id="actor" class="option" onclick="PALETTE_CONTROL.highlight()">
        <img src="img/GRLActor16.gif" alt="Actor" />
        Actor
      </div>
    </div>
    <button class="palette_heading" type="button"
            class="btn btn-info" data-toggle="collapse" data-target="#elements">
      <img class="palette_icon" src="img/folder16.gif"
           alt="Folder" />
      Elements
    </button>
    <div id="elements" class="collapse">
      <div id="softgoal" class="option"
           onclick="PALETTE_CONTROL.highlightSoftgoal()">
        <img src="img/Softgoal16.gif" alt="Softgoal" />
        Softgoal
      </div>
      <div id="goal" class="option"
           onclick="PALETTE_CONTROL.highlightGoal()">
        <img src="img/Goal16.gif" alt="Goal" />
        Goal
      </div>
      <div id="task" class="option"
           onclick="PALETTE_CONTROL.highlightTask()">
        <img src="img/Task16.gif" alt="Task" />
        Task
      </div>
      <div id="resource" class="option"
           onclick="PALETTE_CONTROL.highlightResource()">
        <img src="img/Resource16.gif" alt="Resource" />
        Resource
      </div>
      <div id="belief" class="option"
           onclick="PALETTE_CONTROL.highlightBelief()">
        <img src="img/Belief16.gif" alt="Belief" />
        Belief
      </div>
    </div>
  </div>
  <button type="button" onclick="EXPORTER.exportXml()">Export XML</button>
  <button type="button" onclick="EXPORTER.exportPng()">Export png</button>
  <button type="button" onclick="EXPORTER.exportJpg()">Export jpg</button>
  <button type="button" onclick="EXPORTER.exportGif()">Export gif</button>
  <button type="button" onclick="SAVER.save()">Save</button>
  <img id="export"></img>
  <canvas id="myCanvas"></canvas>
  <script src=
    "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src=
    "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js">
  </script>
  <script src=
    "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js">
  </script>
  <script src="src/js/libraries/raphael.js"></script>
  <script src="src/js/libraries/raphael.free_transform.js"></script>
  <script src="src/js/libraries/raphael.inline_text_editing.js"></script>
  <script src="src/js/libraries/raphael.export.js"></script>
  <script src="src/js/libraries/rgbcolor.js"></script>
  <script src="src/js/libraries/StackBlur.js"></script>
  <script src="src/js/libraries/canvg.js"></script>
  <script src="src/js/paper.js"></script>
  <script src="src/js/select.js"></script>
  <script src="src/js/link_factories/decomposition_factory.js"></script>
  <script src="src/js/link_factories/contribution_factory.js"></script>
  <script src="src/js/link_factories/dependency_factory.js"></script>
  <script src="src/js/link_factories/belief_link_factory.js"></script>
  <script src="src/js/element_factories/softgoal_factory.js"></script>
  <script src="src/js/element_factories/goal_factory.js"></script>
  <script src="src/js/element_factories/task_factory.js"></script>
  <script src="src/js/element_factories/resource_factory.js"></script>
  <script src="src/js/element_factories/belief_factory.js"></script>
  <script src="src/js/exporter.js"></script>
  <script src="src/js/canvas_control.js"></script>
  <script src="src/js/palette_control.js"></script>
  <script src="src/js/onload.js"></script>
  <script src="src/js/saver.js"></script>
</body>
</html>
