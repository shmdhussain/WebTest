
// this is copied to /js/usmap/snaUsMapBottomResultBar.js' 
function updateLegendInfo(currentStateData) {


    
    $(".sna_usem_state_result_cont").removeClass("hide");
    $(".sna_usem_state_result_progress_row, .sna_usem_state_result_winner_row").addClass("hide");


    if (currentStateData.winner === 'REP') {
        //rep is winner in this state
        $(".sna_usem_state_result_winner_row.rep_winner").removeClass("hide");
        $(".sna_usem_state_result_winner_row.rep_winner .sna_usem_state_result_winner_row_electoral_votes").html(currentStateData.repCandidatesElectoralCounts);


    } else if (currentStateData.winner === 'DEM') {
        //dem is winner in this state
        $(".sna_usem_state_result_winner_row.dem_winner").removeClass("hide");
        $(".sna_usem_state_result_winner_row.dem_winner .sna_usem_state_result_winner_row_electoral_votes").html(currentStateData.demCandidatesElectoralCounts);


    } else {
        //counting is in progress or not started
        $(".sna_usem_state_result_progress_row").removeClass("hide");
        $(".sna_usem_state_result_progress_row_dem_vote_percent span").html(currentStateData.demCandidatePct + "%")
        $(".sna_usem_state_result_progress_row_rep_vote_percent span").html(currentStateData.repCandidatePct + "%")
    }

    $(".sna_usem_state_result_state_info").html(currentStateData.stateArabicName);
}
//test