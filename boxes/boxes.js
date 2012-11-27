var Boxes = {
    /**
     * Constant for the left mouse button.
     */
    LEFT_BUTTON: 1,

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        jQueryElements
            .addClass("drawing-area")
            // "this" is Boxes.
            .mousedown(this.startDraw)
            .mousemove(this.trackDrag)
            
            // We conclude drawing on either a mouseup or a mouseleave.
            .mouseup(this.endDrag)
            .mouseleave(this.endDrag);
    },

    /**
     * Utility function for disabling certain behaviors when the drawing
     * area is in certain states.
     */
    setupDragState: function () {
        $(".drawing-area .box")
            .unbind("mousemove")
            .unbind("mouseleave");
    },

    /**
     * Begins a box draw sequence.
     */
    startDraw: function (event) {
        // We only respond to the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            // Add a new box to the drawing area.  Note how we use
            // the drawing area as a holder of "local" variables
            // ("this" as standardized by jQuery).
            this.anchorX = event.pageX;
            this.anchorY = event.pageY;
            this.drawingBox = $("<div></div>")
                .appendTo(this)
                .addClass("box")
                .offset({ left: this.anchorX, top: this.anchorY });

            // Take away the highlight behavior while the draw is
            // happening.
            Boxes.setupDragState();
        }
    },

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        // Don't bother if we aren't tracking anything.
        if (this.drawingBox) {
            console.log("in drawingBox area");
            // Calculate the new box location and dimensions.  Note how
            // this might require a "corner switch."
            var newOffset = {
                left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
            };

            this.drawingBox
                .offset(newOffset)
                .width(Math.abs(event.pageX - this.anchorX))
                .height(Math.abs(event.pageY - this.anchorY));
        } else if (this.movingBox) {
            // Reposition the object.
            console.log("in movingBox area");
            this.movingBox.offset({
                left: event.pageX - this.deltaX,
                top: event.pageY - this.deltaY
            });
        } else if (this.resizingBox) {
            // JD: This code is embedded one level too deep.
                console.log("in resizingbox area LTcorner="+this.LTcorner);
                if (this.LTcorner) {
                    // JD: And *this* code, relative to the line above it, should be
                    //     indented one level deeper.  (although ultimately it does
                    //     not have to move; just shift the lines above it to the left.
                console.log("in resizingbox area if check");
                console.log("originX="+this.originX+", pageX="+event.pageX);
                console.log("originY="+this.originY+", pageY="+event.pageY);
                console.log("this.width="+this.width+", this.height="+this.height);

                    // JD: Hmmmm, OK, there is simply a lot of indentation fixing to
                    //     do here.  I'll stop talking about it now.
                    var newOffset = { left: event.pageX, top: event.pageY };
                    this.resizingBox
                        .offset(newOffset)
                        // JD: These statements are spaced quite irregularly.  I did
                        //     the line below to serve as a good example.
                        .width((this.originX - event.pageX) + this.width)
                        .height( (this.originY - event.pageY )+this.height );
                }
                if (this.LBcorner) {
                console.log("in resizingbox area if check");
                console.log("originX="+this.originX+", pageX="+event.pageX);
                console.log("originY="+this.originY+", pageY="+event.pageY);
                console.log("this.width="+this.width+", this.height="+this.height);
              
                    var newOffset = { left: event.pageX, top: this.originY };
                    this.resizingBox
                        .offset(newOffset)
                        .width(  (this.originX - event.pageX )+this.width )
                        //.height( (event.pageY-this.originY )+this.height );
                        .height( event.pageY-this.originY);
                }
                if (this.RTcorner) {
                console.log("in resizingbox area if check");
                console.log("originX="+this.originX+", pageX="+event.pageX);
                console.log("originY="+this.originY+", pageY="+event.pageY);
                console.log("this.width="+this.width+", this.height="+this.height);
              
                    var newOffset = { left: this.originX, top: event.pageY };
                    this.resizingBox
                        .offset(newOffset)
                        .width  (event.pageX-this.originX )
                        //.height( (event.pageY-this.originY )+this.height );
                        .height( (this.originY - event.pageY) +this.height);
                }
                if (this.RBcorner) {
                console.log("in resizingbox area if check");
                console.log("originX="+this.originX+", pageX="+event.pageX);
                console.log("originY="+this.originY+", pageY="+event.pageY);
                console.log("this.width="+this.width+", this.height="+this.height);
              
                    var newOffset = { left: this.originX, top: this.originY };
                    this.resizingBox
                        .offset(newOffset)
                        .width  (event.pageX-this.originX )
                        //.height( (event.pageY-this.originY )+this.height );
                        .height( event.pageY - this.originY );
                }
        }
 
                    

    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        if (this.drawingBox) {
            // Finalize things by setting the box's behavior.
            this.drawingBox
                .mousemove(Boxes.highlight)
                .mouseleave(Boxes.unhighlight)
                .mousedown(Boxes.startMove);
            
            // All done.
            this.drawingBox = null;
        } else if (this.movingBox) {
            // Change state to "not-moving-anything" by clearing out
            // this.movingBox.
            this.movingBox = null;
        } else if (this.resizingBox) {
            // Change state to "not-moving-anything" by clearing out
            // this.movingBox.
            this.resizingBox = null;
        }

        // In either case, restore the highlight behavior that was
        // temporarily removed while the drag was happening.
        $(".drawing-area .box")
            .removeClass("box-highlight")
            .mousemove(Boxes.highlight)
            .mouseleave(Boxes.unhighlight);
    },

    /**
     * Indicates that an element is highlighted.
     */
    highlight: function () {
        $(this).addClass("box-highlight");
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        // We only move using the left mouse button.
        if (event.which === Boxes.LEFT_BUTTON) {
            // Take note of the box's current (global) location.
            var jThis = $(this),
                startOffset = jThis.offset(),
                widthh = jThis.width(),
                heightt = jThis.height();
                console.log ("heightt="+heightt+ ", widthh="+widthh );

                // Grab the drawing area (this element's parent).
                // We want the actual element, and not the jQuery wrapper
                // that usually comes with it.
                parent = jThis.parent().get(0);

		/////////////
		// added for review by alan
		// added for review of corners
		// added for review of corners
		/////////////
                console.log ("event.pageX="+event.pageX);
                console.log ("event.pageY="+event.pageY);
                parent.LTcorner= ( Math.abs( startOffset.left - event.pageX)<10 && 
                                  Math.abs(startOffset.top   - event.pageY)< 10 )?true:false;
                console.log("LTcorner is"+ parent.LTcorner);
                parent.LBcorner= ( Math.abs(startOffset.left -event.pageX)<10 && 
                                   Math.abs(startOffset.top +heightt - event.pageY) <10)?true:false;
                console.log("LBcorner is"+ parent.LBcorner);
                parent.RTcorner= ( Math.abs(startOffset.left+ widthh - event.pageX) <10  && 
                                   Math.abs(startOffset.top - event.pageY)<10 )?true:false;
                parent.RBcorner= ( Math.abs(startOffset.left + widthh - event.pageX) <10 && 
                                   Math.abs(startOffset.top+ heightt -event.pageY) <10 )?true:false;
                parent.height=heightt
                parent.width=widthh

		if ( parent.LTcorner || parent.LBcorner || parent.RTcorner || parent.RBcorner ) {
                        console.log ("at a corner");
                        parent.originX = startOffset.left
                        parent.originY = startOffset.top

			parent.resizingBox = jThis;
		} else {
                   


                  	// Set the drawing area's state to indicate that it is
                  	// in the middle of a move.
                  	parent.movingBox = jThis;
                  	parent.deltaX = event.pageX - startOffset.left;
                  	parent.deltaY = event.pageY - startOffset.top;
            	}

            // Take away the highlight behavior while the move is
            // happening.
            Boxes.setupDragState();

            // Eat up the event so that the drawing area does not
            // deal with it.
            event.stopPropagation();
        }
    }

};
