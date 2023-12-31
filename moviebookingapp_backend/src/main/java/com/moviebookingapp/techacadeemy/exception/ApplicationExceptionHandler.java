package com.moviebookingapp.techacadeemy.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {
 
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String,String> handleInvalidArgument(MethodArgumentNotValidException ex){
		Map<String,String> errorMap=new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error->{
			errorMap.put(error.getField(),error.getDefaultMessage());
		});
	
		return errorMap;
	}
	
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(MovieNotFoundException.class)
	public Map<String,String> handleMovieException(MovieNotFoundException ex){
		Map<String,String> errorMap=new HashMap<>();
		errorMap.put("errorMessage", ex.getMessage());
	
		return errorMap;
	}
	
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler(MovieFoundException.class)
//	public Map<String,String> handleMovieException(MovieFoundException ex){
//		Map<String,String> errorMap=new HashMap<>();
//		errorMap.put("errorMessage", ex.getMessage());
//
//		return errorMap;
//	}
//
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler(CustomerFoundException.class)
//	public Map<String,String> handleCustomerException(CustomerFoundException ex){
//		Map<String,String> errorMap=new HashMap<>();
//		errorMap.put("errorMessage", ex.getMessage());
//
//		return errorMap;
//	}
	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(TicketNotFoundException.class)
	public Map<String,String> handleCustomerException(TicketNotFoundException ex){
		Map<String,String> errorMap=new HashMap<>();
		errorMap.put("errorMessage", ex.getMessage());
	
		return errorMap;
	}
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserNotFoundException.class)
	public Map<String,String> handleCustomerException(UserNotFoundException ex){
		Map<String,String> errorMap=new HashMap<>();
		errorMap.put("errorMessage", ex.getMessage());
	
		return errorMap;
	}
	
//	@ResponseStatus(HttpStatus.BAD_REQUEST)
//	@ExceptionHandler(CommonException.class)
//	public Map<String,String> handleCustomerException(CommonException ex){
//		Map<String,String> errorMap=new HashMap<>();
//		errorMap.put("errorMessage", ex.getMessage());
//
//		return errorMap;
//	}
	
	
	
	
	
	
}