<%@ page trimDirectiveWhitespaces="true"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="un" uri="http://snap.skynewsarabia.com/taglibs/unstandard-1.0" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="snap" uri="http://skynewsarabia.com/snap" %>
<%@ taglib prefix="h" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fields" tagdir="/WEB-INF/tags/form/fields" %>
<%@ taglib prefix="f" tagdir="/WEB-INF/tags/form"%>

<un:useConstants var="Constraints"
    className="com.skynewsarabia.cms.editor.domain.Section$Constraints" />

<un:useConstants var="Constants"
    className="com.skynewsarabia.cms.editor.web.EditorConstants" />

<spring:url value="/editor/sectionconfiguration/${content.id}"
                context="${servletPath}" var="configUrl" />
<spring:url value="/editor/sectionLayout/${content.id}"
    context="${servletPath}" var="layoutUrl" />
<spring:url value="/editor/sectionTabs/${content.id}"
	context="${servletPath}" var="tabsUrl" />
	<spring:url value="/editor/subsections/${content.id}"
	context="${servletPath}" var="subSectionsUrl" />
<spring:url value="/editor/section/${content.id}" context="${servletPath}" var="mainPageUrl" />
<c:choose>
    <c:when test="${content.id gt 0}">
        <h1>
            Edit <c:out value="${content.name}" /> (<spring:message code="workflow_status_name_${content.status}"/>)
        </h1>
        <ul class="tabs cf" data-sna-ready="publish_place">
			<c:if test = "${content.sectionType != 'PROGRAM_SECTION' and content.sectionType != 'RADIO_PROGRAM_SECTION' and content.sectionType != 'PODCAST_SHOW'}">
			<li>

			    <a href="${mainPageUrl}"> Main Page</a>

			</li>
			</c:if>
				<sec:authorize ifAnyGranted="ROLE_SYS_ADMIN,ROLE_SUPERUSER,ROLE_CHEIF_SUB">
					<c:if test = "${content.sectionType != 'PROGRAM_SECTION' and content.sectionType != 'RADIO_PROGRAM_SECTION' and content.sectionType != 'PODCAST_SHOW'}">
					    <li>
					        |
					    </li>
				    </c:if>
				    <li>
				        <a href="${configUrl}"> Configuration</a>
				    </li>
			     </sec:authorize>
			     <sec:authorize ifAnyGranted="ROLE_SYS_ADMIN,ROLE_SUPERUSER,ROLE_CHEIF_SUB">
			     	<c:if test="${content.sectionType eq 'MAIN_SECTION' || content.sectionType eq 'HOME_SECTION' || content.sectionType eq 'SUB_SECTION' || content.sectionType eq 'PROGRAM_HOME_SECTION' || content.sectionType == 'RADIO_PROGRAM_HOME_SECTION' || content.sectionType == 'PODCAST_HOME_SECTION' || content.sectionType == 'VIDEO_SECTION'}">
						<li>
					        |
					    </li>
					    <li>
					        <a href="${layoutUrl}"> Layout</a>
					    </li>
				    </c:if>
			    </sec:authorize>
			    <sec:authorize ifAnyGranted="ROLE_SYS_ADMIN,ROLE_SUPERUSER,ROLE_CHEIF_SUB">
			    <c:if test = "${content.sectionType != 'PROGRAM_SECTION' and content.sectionType != 'RADIO_PROGRAM_SECTION' and content.sectionType != 'PODCAST_SHOW' and content.sectionType != 'VIDEO_SECTION'}">
    				<c:choose>
			    		<c:when test = "${content.sectionType == 'PROGRAM_HOME_SECTION'}">
			    			<li>|</li>
			        		<li><a href="${subSectionsUrl}"> Program</a></li>
			   			</c:when>
			   			<c:when test = "${content.sectionType == 'RADIO_PROGRAM_HOME_SECTION'}">
			    			<li>|</li>
			        		<li><a href="${subSectionsUrl}"> Radio Programs</a></li>
			   			</c:when>
			   			<c:when test = "${content.sectionType == 'PODCAST_HOME_SECTION'}">
			    			<li>|</li>
			        		<li><a href="${subSectionsUrl}"> Podcast Shows</a></li>
			   			</c:when>
			   			<c:otherwise>
			   				<li>|</li>
			        		<li><a href="${subSectionsUrl}"> Sub-Sections</a></li>
			   			</c:otherwise>
    				</c:choose>
   				</c:if>
			   </sec:authorize>
			</ul>
    </c:when>
    <c:otherwise>
        <h1>Create Section</h1>
    </c:otherwise>
</c:choose>

<form:form commandName="content" method="post" data-sna-ready="validation" id="segmentSearch" data-sna-selected-segment-list='${allSegments}' data-sna-disabled="${pageDisabled}">
    <h2 data-sna-ready="section_config">Configuration</h2>
    <div class="meta"></div>

    <c:set var="formError">
        <form:errors element="div" cssClass="error" data-sna-ready="errors" />
    </c:set>
    <c:if test="${not empty messages || formError != ''}">
        <div class="message">
            <c:forEach var="message" items="${messages}">
                <c:if test="${not empty message.text}">
                    <div class="${message.type.cssClass}">${message.text}</div>
                </c:if>
            </c:forEach>
            <c:if test="${formError != ''}">
                <c:out value="${formError}" escapeXml="false" />
            </c:if>
        </div>
    </c:if>

    <fieldset>
        <legend>Section</legend>

        <div class="confGroup">
            <fieldset>
                <legend>General</legend>
                <form:hidden path="id" />
                <form:hidden path="subSection" />
                <%-- <form:hidden path="sectionType" /> --%>
                <form:hidden path="imageFileName" />
                <form:hidden path="appProgDetailImageFileName" />
                <form:hidden path="appProgListImageFileName" />
                <form:hidden path="webProgDetailImageFileName" />
                <form:hidden path="webProgListImageFileName" />
                <form:hidden path="navOrder" />
				<form:hidden path="status" />

                <c:set var="newAttributesDisabled" value="${pageDisabled}"/>

                <c:if test="${content.sectionType != null && !content.sectionType.canCreateNew}">
                    <c:set var="newAttributesDisabled" value="true"/>
                </c:if>
                <c:if test = "${content.status.publishedStatus eq true }">
                	<c:set var = "canChangeSectionType" value = "true"/>
                </c:if>
                

                <%-- Check if section is disabled --%>
                <c:choose>
                    <c:when test="${newAttributesDisabled or canChangeSectionType}">
                        <spring:message code="general_pls_select" var="pls_select"/>
                        <form:label path="sectionType" class = "required">Section Type</form:label>
                        <form:select path="sectionType" id="sectionType" disabled="true">
                            <c:forEach items="${sectionTypes}" var="type">
                                <c:if test="${content.sectionType eq type}">
                                    <spring:message code="section_type_name_${type}" var="sectionTypeVar"/>
                                    <form:option value="${type}">${sectionTypeVar}</form:option>
                                </c:if>
                            </c:forEach>
                        </form:select>
                    </c:when>
                    <c:otherwise>
                        <spring:message code="general_pls_select" var="pls_select"/>
                        <form:label path="sectionType" class = "required">Section Type</form:label>
                        <form:select path="sectionType" id="sectionType">
                            <form:option value="-1">${pls_select}</form:option>
                            <c:forEach items="${sectionTypes}" var="type">
                                <spring:message code="section_type_name_${type}" var="sectionTypeVar"/>
                                <c:choose>
                                    <c:when test="${type eq 'RADIO_PROGRAM_SECTION' or type eq 'PODCAST_SHOW' }">
                                        <sec:authorize ifAnyGranted="ROLE_SYS_ADMIN,ROLE_SUPERUSER,ROLE_RADIO_MANAGER">
                                            <form:option value="${type}">${sectionTypeVar}</form:option>
                                        </sec:authorize>
                                    </c:when>
                                    <c:otherwise>
                                        <sec:authorize ifAnyGranted="ROLE_SYS_ADMIN,ROLE_SUPERUSER">
                                            <form:option value="${type}">${sectionTypeVar}</form:option>
                                        </sec:authorize>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                         </form:select>
                    </c:otherwise>
                </c:choose>

                 <c:if test = "${newAttributesDisabled or  canChangeSectionType}">
                 	<form:hidden path="sectionType"/>
                 </c:if>


                 <br />
                 
                <c:choose>                 
                    <c:when test = "${content.sectionType eq 'RADIO_PROGRAM_SECTION' }">                      
                        <c:set var = "podcastShowHide" value = "1"/>
                    </c:when>
                    <c:otherwise>
                        <c:set var = "podcastShowHide" value = "0"/>
                    </c:otherwise>   
                 </c:choose>
                <div class="podcastCategory" style="${podcastShowHide eq '1' ? '' : 'display:none'  }">
                    <form:label path="podcastCategory" class = "required">Podcast Category</form:label>
                    <form:select path="podcastCategory" id="podcastCategory" disabled="${newAttributesDisabled}" >
                        <form:option value="">${pls_select}</form:option>
                        <c:forEach items="${podcastCategories}" var="pCategory">                        
                            <form:option value="${pCategory.name}">${pCategory.caption}</form:option>
                        </c:forEach>
                    </form:select>
                </div>                               
                 
                                 

                <fields:input path="name"
                    maxlength="${Constraints.NAME_MAX}"
                    disabled="${newAttributesDisabled}" required="true" />
                    
                    <c:choose>
                    	<c:when test = "${content.sectionType eq 'RADIO_PROGRAM_HOME_SECTION' }">                    		
                    		<c:set var = "displayNameSize" value = "50" />
                    	</c:when>
                    	<c:otherwise>
                    		<c:set var = "displayNameSize" value = "${Constraints.DISPLAY_NAME_MAX}" />
                    	</c:otherwise>
                    </c:choose>
				
                <fields:input path="displayName"
                    maxlength="${displayNameSize}"
                    disabled="${pageDisabled}" required="true" />
			<%-- 	<c:if test = "${content.sectionType ne 'PROGRAM_HOME_SECTION' }">
	                <div class="program_section_show">
	                    <fields:input path="playlistId" label="youtube playlist id" maxlength="${Constraints.TITLE_MAX}"
	                        disabled="${pageDisabled}" required="true" />
	                </div>
                </c:if> --%>

	            <fields:input path="title" maxlength="${Constraints.TITLE_MAX}"
                   disabled="${pageDisabled}" required="true" />
                   
                <c:if test="${content.sectionType eq 'HOME_SECTION' or content.sectionType eq 'MAIN_SECTION' or content.sectionType eq 'SUB_SECTION'}">  
                	<fields:input path="latestNewsTitle" maxlength="${Constraints.TITLE_MAX}"
                   		disabled="${pageDisabled}" required="true"/>
				</c:if> 
                <fields:textarea path="description" disabled="${pageDisabled}"
                    maxlength="200" required="true" />
                <fields:input path="keywords"
                    maxlength="${Constraints.KEYWORDS_MAX}" disabled="${pageDisabled}"
                    required="true" />


                <span class="urlHolder">
                	<c:set var="urlError">
                       <form:errors element="div" cssClass="error" path="url"
                                  delimiter=" | " />
					</c:set>
                    <c:choose>
                        <c:when test="${not empty content.parentUrl}">
                          <%-- <fields:input id="url" path="url" placeholder="Enter URL here" maxlength="${Constraints.URL_MAX}"
                               disabled="${pageDisabled or disableUrl}" required="true" urlPrefix="https://www.skynewsarabia.com${content.parentUrl}"/> --%>
                            <label for="url" class="required">URL</label>
                            <div class="url-structure">
                                <label class="urlPrefix" for="url">https://www.skynewsarabia.com${empty content.parentUrl ? '/' : content.parentUrl}</label>
                                <input id="url" name="url" class = "${urlError != '' ? 'error' : ''  }" placeholder="Enter URL here" type="text" value="${content.url}" maxlength="50" autocomplete="off" />
                                <form:errors element="div" cssClass="error" path="url" delimiter=" | " />
                                <form:hidden path="parentUrl"/>

                            </div>
                        </c:when>
                        <c:otherwise>
                            <label for="url" class="required">URL</label>
                            <div class="url-structure">
                                <label class="urlPrefix" for="url">https://www.skynewsarabia.com/</label>
                                <input id="url" name="url" class = "${urlError != '' ? 'error' : ''  }" placeholder="Enter URL here" type="text" value="${content.url}" maxlength="50" autocomplete="off" />                                
                                <form:errors element="div" cssClass="error" path="url" delimiter=" | " />
                            </div>
                        </c:otherwise>
                    </c:choose>
                </span>
				
				<div class="podcastLinks" style="${podcastShowHide eq '1' ? '' : 'display:none'  }">                    
                    <fields:input path="googlePodcastLink" id="googlePodcastLink" disabled="${pageDiabled}" maxlength="1024"/>                        
                    <br/>                   
                    <fields:input path="applePodcastLink" id="applePodcastLink" disabled="${pageDiabled}" maxlength="1024"/>
                    <br/>
                    <fields:input path="tuneInPodcastLink" id="tuneInPodcastLink" disabled="${pageDiabled}" maxlength="1024"/>
                    <br/>
                    <fields:input path="soundCloudPodcastLink" id="soundCloudPodcastLink" disabled="${pageDiabled}" maxlength="1024"/>
                    <br/>
                    <fields:input path="otherFeedLink" id="otherFeedLink" disabled="${pageDiabled}" maxlength="1024"/>
                </div> 

              <c:if test = "${content.sectionType ne 'PROGRAM_HOME_SECTION' }">
				<div class="program_section_show not_prog_home_section">

	                 <fields:input path="date1"  id="timepick1"
	                     maxlength="${Constraints.DATE1_MAX}" required="true" />
	                <fields:input path="timezone2"
	                    disabled="${pageDisabled}" maxlength="${Constraints.TIMEZONE2_MAX}" required="true" />
	                 <fields:input path="date2" id="timepick2"
	                     maxlength="${Constraints.DATE2_MAX}" required="true" />
	                <%--  <fields:input path="day"
	                    disabled="${pageDisabled}" maxlength="${Constraints.DAY_MAX}" required="true" /> --%>
                    <%--START: Program Days Selection--%>
                    <div class="days-select">
                        <label for="selectedDays" class="required">PROGRAM DAY(S)</label> 
                        <%--<form:checkboxes items="${content.programDayList}" path="selectedDays"/>  --%>
                        <form:select path="day">
                        	<form:option value="يوميا"> 
                        	يوميا
                        	</form:option>
                        	<form:option value="الأحد"> 
                        	الأحد
                        	</form:option>
                        	<form:option value="الإثنين"> 
                        	الإثنين
                        	</form:option>
                        	<form:option value="الثلاثاء"> 
                        	الثلاثاء
                        	</form:option>
                        	<form:option value="الأربعاء"> 
                        	الأربعاء
                        	</form:option>
                        	<form:option value="الخميس"> 
                        	الخميس
                        	</form:option>
                        	<form:option value="الجمعة"> 
                        	الجمعة
                        	</form:option>
                        	<form:option value="السبت"> 
                        	السبت
                        	</form:option>
                        	<form:option value="-1"> 
                        	Other
                        	</form:option>
                        </form:select>
                        
                        <div class="manual-days">
                            <label for="daysText">DAY(S)</label>
                            <input id="daysText" type="text" name="daysText" maxlength="18"  value="${not empty content.daysText ? content.daysText : 'يوميا'}"/>
                        </div>
                    </div>
                    <%--END: Program Days Selection--%>
                    <div class="footerActions" style="overflow:visible">
                        <div id="programDays">
                             <label>Enable Program Live Notifications</label>
                             <form:checkbox path="liveNotification" class="toggle-notif" disabled="${alreadyLocked}" styleClass="label-arabic"/><br/>
                        </div>
                        <%-- START: Notification Days Selection --%>
                        <div class="notif-days">
                            <label>NOTIFICATION DAY(S)</label>                    
                            <span class="SumoSelect">
                                <c:forEach items="${content.programDayList}" var="day" varStatus="status">
                                    <label for="selectedDays${status.index + 1}" class="label-arabic">${day}</label>
                                    <form:checkbox path="selectedDays" value="${day}"/>
                                </c:forEach>
                            </span>
                            <form:errors element="div" cssClass="error" path="selectedDays"
                                    delimiter=" | " />
                        </div>
                        <%-- END: Notification Days Selection --%>  
                        <c:choose>
                    	<c:when test = "${empty content.sectionType or content.sectionType eq 'PROGRAM_SECTION'}" >
							<c:set var = "episodeSegmentBlockStyle" value = ""/>
						</c:when>
                    	<c:otherwise>
                    		<c:set var = "episodeSegmentBlockStyle" value = "display:none;"/>
                    	</c:otherwise>
                    </c:choose>
                                                	                        	
                            <div class = "program_section_show" style = "${episodeSegmentBlockStyle}">
	                            <label class = "required">PROGRAM TYPE</label>
	                            
	                            <form:select path="episodic"  disabled="${newAttributesDisabled or canChangeSectionType }">
	                            	<form:option value="" >${pls_select}</form:option>
	                            	<form:option value = "true">Episodic</form:option>
	                            	<form:option value = "false">Non Episodic</form:option>
	                            </form:select>
	                            <c:if test = "${newAttributesDisabled or  canChangeSectionType}">
				                 	<form:hidden path="episodic"/>
				                 </c:if>
	                            <br/>
	                            <fields:checkbox path="segmentEnabled" id="segmentEnabled" value="true"  disabled="${newAttributesDisabled}"  labelCode="segment.enabled"/>
	                            <form:errors element="div" cssClass="error" path="segmentEnabled"
                                    delimiter=" | " />
                            </div>
                    </div>
                    
                        <div class="segment-association" style="${episodeSegmentBlockStyle}">
                            <label>Segments</label>
                            <div class="segment-selection"
                                data-sna-selected-segment-list='${snap:toJSON(content.segments)}'>
                                <button name="search" value="Search" class="orange" type="button"
                                    id="searchButton">Search</button>
                                <form:errors element="div" cssClass="error" path="segments"
                                    delimiter=" | " />
                                <ul id="segments-inputs">

                                    <c:forEach items="${content.segments}" var="currentSegment"
                                        varStatus="status">
                                        <c:choose>
                                            <c:when test="${not pageDisabled}">
                                                <li>${currentSegment.name}<a href="javascript:"
                                                    data-item-index="${status.index}">x</a>
                                                    <input
                                                    id="segments${status.index}" type="hidden"
                                                    name="segments[${status.index}].id"
                                                    value="${currentSegment.id}">
                                                    <input
                                                    id="segments${status.index}" type="hidden"
                                                    name="segments[${status.index}].name"
                                                    value="${currentSegment.name}">
                                                </li>
                                            </c:when>
                                            <c:otherwise>
                                                <li>${currentSegment.name}<a style="display: none"
                                                    href="javascript:" data-item-index="${status.index}">x</a>
                                                    <input
                                                    id="segments${status.index}" type="hidden"
                                                    name="segments[${status.index}].id"
                                                    value="${currentSegment.id}">
                                                    <input
                                                    id="segments${status.index}" type="hidden"
                                                    name="segments[${status.index}].name"
                                                    value="${currentSegment.name}">
                                                    </li>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>

                                </ul>
                            </div>
                        </div>
                    <div id="segmentSearchDialog">
                        <div id="segmentFilterDiv">
                            <input id="filterText" type="text" placeholder="بحث"/>
                            <fieldset id="buttons">
                                <button name="close" value="Close" class="orange" type="button" id="closeButton">Close</button>
                            </fieldset>
                        </div>
                        <div id="segmentSearchMessage" class="message">
                            <div id="segmentSearchError" class="warning">
                                No such segment exists.
                            </div>
                        </div>
                        <div class="selectedSegmentsDialogDiv">
                            <ul id="dialogSegmentInputs">
                                <c:forEach items="${segments}" var="segment" varStatus="status">
                                    <c:choose>
                                        <c:when test="${not pageDisabled}">
                                            <li>
                                                ${segment.name}<a href="javascript:" data-item-index="${status.index}">x</a>
                                                <input id="segments${status.index}" type="hidden" name="segments[${status.index}].id" value="${segment.id}">
                                                <input id="segments${status.index}" type="hidden" name="segments[${status.index}].name" value="${segment.name}">
                                            </li>
                                        </c:when>
                                        <c:otherwise>
                                            <li>
                                                ${segment.name}<a style="display:none" href="javascript:" data-item-index="${status.index}">x</a>
                                                <input id="segments${status.index}" type="hidden" name="segments[${status.index}].id" value="${segment.id}">
                                                <input id="segments${status.index}" type="hidden" name="segments[${status.index}].name" value="${segment.name}">
                                            </li>
                                        </c:otherwise>
                                    </c:choose>
                                </c:forEach>
                            </ul>
                        </div>
                        <div id="segmentListDiv">
                            <ul id="segmentList">
                            </ul>
                        </div>
                    </div>
	            </div>
            </c:if>

                <%-- <c:if test="${content.sectionType ne 'PROGRAM_SECTION' && content.sectionType ne 'PROGRAM_HOME_SECTION'}">
                     <div class="showLoadMoreCont">
                        <fields:checkbox id="loadMoreSectionNews" value="true" path="showLoadMore" disabled="${pageDisabled}" />
                    </div>
                </c:if> --%>
                 <%-- <c:if test = "${content.sectionType eq 'HOME_SECTION' or content.sectionType eq 'MAIN_SECTION' or content.sectionType eq 'SUB_SECTION' or content.sectionType eq 'PROGRAM_HOME_SECTION' or content.sectionType eq 'RADIO_PROGRAM_HOME_SECTION' or content.sectionType eq 'PODCAST_HOME_SECTION' or content.sectionType eq 'VIDEO_SECTION'}"> --%>
	        	      <div class="program-image-inner-cont section-sharing-image" >
		           	<label class="required">Sharing Image</label>
		           	<h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
		                   relationType="${'SECTION_SHARING_IMAGE'}" typeRestriction="IMAGE_SET"
		                   numberOfItems="1"
		                   caption="1" section="1" allowMultiple="0"
		                   pgdisabled="${pageDisabled}"
		                   editButton="1"
                           captionNotRequired="1"
		                   imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>
					</div>
				<%-- </c:if> --%>
				<br/>
				<c:if test = "${content.sectionType eq 'MAIN_SECTION'}">
		    		<div class="custom-html-image-inner" style="display: none;">
		 				<label>Article HTML (for Web &amp; AMP)</label>	 				
		 					
		 					<h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                    relationType="${'CUSTOM_HTML'}" typeRestriction="CUSTOM_HTML"
                                    numberOfItems="1"
                                    caption="0" section="1" allowMultiple="0"
                                    pgdisabled="${pageDisabled}"
                                    editButton="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>
		    		</div>
		    	</c:if>
		    	<br/>		    	
		    	<c:if test = "${content.sectionType eq 'MAIN_SECTION'}">
		    		<div class="custom-html-image-inner" style="display: none;">
		 				<label>Article HTML (for Apps)</label>	 				
		 					
		 					<h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                    relationType="${'APPS_CUSTOM_HTML'}" typeRestriction="CUSTOM_HTML"
                                    numberOfItems="1"
                                    caption="0" section="1" allowMultiple="0"
                                    pgdisabled="${pageDisabled}"
                                    editButton="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>
		    		</div>
		    	</c:if>
		    	<br/>
		    	<c:if test = "${content.sectionType eq 'MAIN_SECTION' or content.sectionType eq 'HOME_SECTION'}">
		    		<div class="custom-html-image-inner" style="display: none;">
		 				<label>HTML Widget (for Apps)</label>	 				
		 					
		 					<h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                    relationType="${'WIDGET_CUSTOM_HTML'}" typeRestriction="CUSTOM_HTML"
                                    numberOfItems="1"
                                    caption="0" section="1" allowMultiple="0"
                                    pgdisabled="${pageDisabled}"
                                    editButton="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>
		    		</div>
		    	</c:if>
                    <div class="footerActions">
                            <div>
                                <fields:checkbox path="active" id="active" value="true"
                                disabled="${newAttributesDisabled}" />                                								
                            </div>							
                           <form:hidden path="enableComments" value="true"/>

                    </div>
                    <c:if test="${content.sectionType eq 'HOME_SECTION' or content.sectionType eq 'MAIN_SECTION' or content.sectionType eq 'SUB_SECTION'}">  
                        <label path="podcastCategory">Ads Config</label>
                        <form:input path="dfpAdConfig"  placeholder="{AD_TYPE}-{ORDER}"/>
                    </c:if>

            </fieldset>

        </div>
		<div class="confGroup program_section_show">
            <fieldset >
                <legend>Social Pages</legend>
                <fields:checkbox path="likeEnabled" id="likeEnabled" value="true"
                    disabled="${newAttributesDisabled}" /></li> <br>

                    <%-- Like <form:checkbox path="likeEnabled" />--%>
                    <fields:input path="likeUrl" maxlength="${Constraints.POLL_URL_MAX}"
                        disabled="${pageDisabled}" required="false" /><br><br>

                        <fields:checkbox path="followEnabled" id="followEnabled" value="true"
                    disabled="${newAttributesDisabled}" /></li> <br>
                    <%-- Follow <form:checkbox path="followEnabled" /> --%>
                    <fields:input path="followUrl" maxlength="${Constraints.POLL_URL_MAX}"
                        disabled="${pageDisabled}" required="false" />
            </fieldset>
            <c:if test = "${content.sectionType ne 'PROGRAM_HOME_SECTION' }">
            <fieldset class="program-image-cont">

                <legend>Program Images</legend>

                    <div class="program-image-inner-cont">
                        <fieldset>
                            <legend>Web Image</legend>
                            <label class="required" >
                                Program Wide Image (2000 x 588)
                            </label>
                            <h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                    relationType="${'PROGRAM_WIDE_IMAGE'}" typeRestriction="IMAGE_SET"
                                    numberOfItems="1"
                                    caption="1" section="1" allowMultiple="0"
                                    pgdisabled="${pageDisabled}"
                                    editButton="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>

                    </div>
                    <div class="program-image-inner-cont">
                            <fieldset>
                            <legend>Mobile App Image</legend>
                            <label class="required">
                                List Image (598 x 337)
                            </label>
                            <h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                     relationType="${'APP_PROG_LIST_IMAGE'}" typeRestriction="IMAGE_SET"
                                     numberOfItems="1"
                                     caption="1" section="1" allowMultiple="0"
                                     pgdisabled="${pageDisabled}"
                                     editButton="1"
                                     captionNotRequired="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>
                            </fieldset>
                    </div>
                    <div class="program-image-inner-cont">
                            <fieldset>
                            <legend>Logo for featured episodes</legend>
                             <LABEL class="required">
                                Logo Image (160 x 93)
                            </LABEL>
                            <h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                     relationType="${'PROGRAM_LOGO'}" typeRestriction="IMAGE_SET"
                                     numberOfItems="1"
                                     caption="1" section="1" allowMultiple="0"
                                     pgdisabled="${pageDisabled}"
                                     editButton="1"
                                     captionNotRequired="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>

						</fieldset>
                    </div>
                    <div class="program-image-inner-cont">
                            <fieldset>
                            <legend>16 x 9 Image</legend>
                             <LABEL class="required">
                                Image
                            </LABEL>
                            <h:relatedContentSet relatedContentMap="${content.relatedContentMap}"
                                     relationType="${'IMAGE_16x9'}" typeRestriction="IMAGE_SET"
                                     numberOfItems="1"
                                     caption="1" section="1" allowMultiple="0"
                                     pgdisabled="${pageDisabled}"
                                     editButton="1"
                                     captionNotRequired="1"
                                    imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94" h="52"/>

						</fieldset>
                    </div>

               </c:if>
         </div>
    </fieldset>
    <div class="confGroup">
    	<fieldset class="radio-program-image-fieldset">

    		<legend>Program Image</legend>

    		<div class="radio-program-image-inner">
    				<form:label for="radioProgramImageFile"
    					path="radioProgramImageFile" cssClass="required">
                                    Image
                                </form:label>
    				<h:relatedContentSet
    					relatedContentMap="${content.relatedContentMap}"
    					relationType="${'RADIO_PROG_IMAGE'}"
    					typeRestriction="IMAGE_SET" numberOfItems="1" caption="1"
    					section="1" allowMultiple="0" pgdisabled="${pageDisabled}"
    					editButton="1" imgGrpCms="${'IMG_GRP_CMS_16x9_LANDSCAPE'}" w="94"
    					h="52" />
    		</div>
    	</fieldset>
    </div>    
	<c:if test="${authorizeRadioManagerAttr and !snap:isSectionPublishPending(content)}">
        <fieldset id="creat_section_btn" class="buttons sticky contentItemButtons">
            <div id="contentItemButtons" data-sna-ready="publish_place" style="padding-top:0.7rem;">
                <spring:message code="general.updateButtonText"
                    var="updateButtonText" />
                <button disabled="true" type="submit" class="btn btn-success" value="${updateButtonText}"
                    title="${updateButtonText}" name="${Constants.MODE_SAVE}">
                    <span class="icn icn-close">
                        <img src="${appAssetsUrl}/images/icons/save-icn-btn.png"/>
                     </span>
                     <span class="text-btn">Save</span>
                </button>
                <c:if test = "${(content.sectionType eq 'PROGRAM_SECTION' or  content.sectionType eq 'RADIO_PROGRAM_SECTION'  or  content.sectionType eq 'PODCAST_SHOW' ) and (content.status != '' and content.status != 'CREATE')}" >
		       		<button type="submit" class="btn btn-success" value="${previewButtonText}" title="${previewButtonText}" name="${Constants.MODE_PREVIEW}">
	                   <span class="icn icn-close">
	                        <img src="${appAssetsUrl}/images/icons/preview-icn-btn.png"/>
	                     </span>
	                    <span class="text-btn">Preview</span>
	                </button>
				</c:if>
                <c:if test = "${(content.sectionType eq 'PROGRAM_SECTION' or  content.sectionType eq 'PROGRAM_HOME_SECTION' or content.sectionType eq 'RADIO_PROGRAM_HOME_SECTION' or content.sectionType eq 'RADIO_PROGRAM_SECTION'  or  content.sectionType eq 'PODCAST_SHOW') and (content.status != '' and content.status != 'CREATE')}" >
	                <button type="submit" class="btn btn-success" value="${publishButtonText}" title="${publishButtonText}" name="${Constants.MODE_PUBLISH}">
			           <span class="icn icn-close">
			               <img src="${appAssetsUrl}/images/icons/publish-icn-btn.png"/>
			            </span>
			            <span class="text-btn">Publish</span>
			       </button>
		       </c:if>
            </div>
        </fieldset>

        <c:if test = "${content.sectionType eq 'PROGRAM_SECTION' || content.sectionType eq 'PROGRAM_HOME_SECTION' }">
	        <%-- <c:if test="${snap:canAction(PageConstants.MODE_PUBLISH, content)}"> --%>

		   <%-- </c:if> --%>
	   </c:if>
	</c:if>
	
	    <c:if test="${content.id gt 0 && doPreview}">
	    	<c:choose>   
	    		<c:when test = "${content.sectionType eq 'PROGRAM_SECTION'}">
					<spring:url value="/program/${content.url}-${content.displayName }" var="previewUrl" context="${servletPath}" />
        		</c:when>
        		<c:when test = "${content.sectionType eq 'PODCAST_SHOW'}">
					<spring:url value="/podcast/${content.url}-${content.displayName }" var="previewUrl" context="${servletPath}" />
        		</c:when>
        		<c:otherwise>
					<spring:url value="${previewUrl}" var="previewUrl" context="${servletPath}" />
        		</c:otherwise>
        	</c:choose>         	        	
        	<var id="sectionPreview" data-snap-url="${previewUrl}" />
    	</c:if>
    	
    	
</form:form>


